import { 
  users, 
  privacyScans,
  trackerDetections,
  systemStatus,
  type User, 
  type InsertUser,
  type PrivacyScan,
  type InsertPrivacyScan,
  type TrackerDetection,
  type InsertTrackerDetection,
  type SystemStatus,
  type InsertSystemStatus
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Privacy scan methods
  createPrivacyScan(scan: InsertPrivacyScan): Promise<PrivacyScan>;
  getAllPrivacyScans(): Promise<PrivacyScan[]>;
  
  // Tracker detection methods
  createTrackerDetection(detection: InsertTrackerDetection): Promise<TrackerDetection>;
  getTrackerDetectionsByScanId(scanId: number): Promise<TrackerDetection[]>;
  
  // System status methods
  getSystemStatus(): Promise<SystemStatus>;
  updateSystemStatus(status: InsertSystemStatus): Promise<SystemStatus>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private privacyScans: Map<number, PrivacyScan>;
  private trackerDetections: Map<number, TrackerDetection>;
  private systemStatus: SystemStatus;
  private currentId: number;
  private currentScanId: number;
  private currentDetectionId: number;

  constructor() {
    this.users = new Map();
    this.privacyScans = new Map();
    this.trackerDetections = new Map();
    this.currentId = 1;
    this.currentScanId = 1;
    this.currentDetectionId = 1;
    
    // Initialize default system status
    this.systemStatus = {
      id: 1,
      protectionActive: true,
      vpnActive: false,
      adBlockerActive: true,
      trackerShieldActive: true,
      dnsFilterActive: true,
      lastUpdated: new Date()
    };
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createPrivacyScan(insertScan: InsertPrivacyScan): Promise<PrivacyScan> {
    const id = this.currentScanId++;
    const scan: PrivacyScan = {
      ...insertScan,
      id,
      scanDate: new Date()
    };
    this.privacyScans.set(id, scan);
    return scan;
  }

  async getAllPrivacyScans(): Promise<PrivacyScan[]> {
    return Array.from(this.privacyScans.values());
  }

  async createTrackerDetection(insertDetection: InsertTrackerDetection): Promise<TrackerDetection> {
    const id = this.currentDetectionId++;
    const detection: TrackerDetection = {
      id,
      scanId: insertDetection.scanId || null,
      trackerType: insertDetection.trackerType,
      domain: insertDetection.domain,
      blocked: insertDetection.blocked || false,
      detectionDate: new Date()
    };
    this.trackerDetections.set(id, detection);
    return detection;
  }

  async getTrackerDetectionsByScanId(scanId: number): Promise<TrackerDetection[]> {
    return Array.from(this.trackerDetections.values()).filter(
      detection => detection.scanId === scanId
    );
  }

  async getSystemStatus(): Promise<SystemStatus> {
    return this.systemStatus;
  }

  async updateSystemStatus(statusUpdate: InsertSystemStatus): Promise<SystemStatus> {
    this.systemStatus = {
      ...this.systemStatus,
      ...statusUpdate,
      lastUpdated: new Date()
    };
    return this.systemStatus;
  }
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createPrivacyScan(insertScan: InsertPrivacyScan): Promise<PrivacyScan> {
    const [scan] = await db
      .insert(privacyScans)
      .values(insertScan)
      .returning();
    return scan;
  }

  async getAllPrivacyScans(): Promise<PrivacyScan[]> {
    return await db.select().from(privacyScans);
  }

  async createTrackerDetection(insertDetection: InsertTrackerDetection): Promise<TrackerDetection> {
    const [detection] = await db
      .insert(trackerDetections)
      .values(insertDetection)
      .returning();
    return detection;
  }

  async getTrackerDetectionsByScanId(scanId: number): Promise<TrackerDetection[]> {
    return await db.select().from(trackerDetections).where(eq(trackerDetections.scanId, scanId));
  }

  async getSystemStatus(): Promise<SystemStatus> {
    const [status] = await db.select().from(systemStatus);
    if (!status) {
      // Create default system status if none exists
      const defaultStatus = {
        protectionActive: true,
        vpnActive: false,
        adBlockerActive: true,
        trackerShieldActive: true,
        dnsFilterActive: true
      };
      return await this.updateSystemStatus(defaultStatus);
    }
    return status;
  }

  async updateSystemStatus(statusUpdate: InsertSystemStatus): Promise<SystemStatus> {
    const existingStatus = await db.select().from(systemStatus);
    
    if (existingStatus.length === 0) {
      const [newStatus] = await db
        .insert(systemStatus)
        .values(statusUpdate)
        .returning();
      return newStatus;
    } else {
      const [updatedStatus] = await db
        .update(systemStatus)
        .set(statusUpdate)
        .returning();
      return updatedStatus;
    }
  }
}

export const storage = new DatabaseStorage();
