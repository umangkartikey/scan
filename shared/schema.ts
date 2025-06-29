import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const privacyScans = pgTable("privacy_scans", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  score: integer("score").notNull(),
  trackersBlocked: integer("trackers_blocked").notNull(),
  trackersActive: integer("trackers_active").notNull(),
  riskLevel: text("risk_level").notNull(),
  scanDate: timestamp("scan_date").defaultNow().notNull(),
});

export const trackerDetections = pgTable("tracker_detections", {
  id: serial("id").primaryKey(),
  scanId: integer("scan_id").references(() => privacyScans.id),
  trackerType: text("tracker_type").notNull(),
  domain: text("domain").notNull(),
  blocked: boolean("blocked").default(false).notNull(),
  detectionDate: timestamp("detection_date").defaultNow().notNull(),
});

export const systemStatus = pgTable("system_status", {
  id: serial("id").primaryKey(),
  protectionActive: boolean("protection_active").default(true).notNull(),
  vpnActive: boolean("vpn_active").default(false).notNull(),
  adBlockerActive: boolean("ad_blocker_active").default(true).notNull(),
  trackerShieldActive: boolean("tracker_shield_active").default(true).notNull(),
  dnsFilterActive: boolean("dns_filter_active").default(true).notNull(),
  lastUpdated: timestamp("last_updated").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertPrivacyScanSchema = createInsertSchema(privacyScans).omit({
  id: true,
  scanDate: true,
});

export const insertTrackerDetectionSchema = createInsertSchema(trackerDetections).omit({
  id: true,
  detectionDate: true,
});

export const insertSystemStatusSchema = createInsertSchema(systemStatus).omit({
  id: true,
  lastUpdated: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertPrivacyScan = z.infer<typeof insertPrivacyScanSchema>;
export type PrivacyScan = typeof privacyScans.$inferSelect;

export type InsertTrackerDetection = z.infer<typeof insertTrackerDetectionSchema>;
export type TrackerDetection = typeof trackerDetections.$inferSelect;

export type InsertSystemStatus = z.infer<typeof insertSystemStatusSchema>;
export type SystemStatus = typeof systemStatus.$inferSelect;
