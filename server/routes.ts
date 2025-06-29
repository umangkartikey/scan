import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPrivacyScanSchema, insertTrackerDetectionSchema, insertSystemStatusSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Privacy scan endpoints
  app.get("/api/privacy-scan/:url", async (req, res) => {
    try {
      const url = decodeURIComponent(req.params.url);
      
      // Simulate privacy scan
      const mockScan = {
        url,
        score: Math.floor(Math.random() * 30) + 70, // 70-100
        trackersBlocked: Math.floor(Math.random() * 500) + 300,
        trackersActive: Math.floor(Math.random() * 50) + 10,
        riskLevel: Math.random() > 0.7 ? "HIGH" : Math.random() > 0.4 ? "MEDIUM" : "LOW"
      };

      const scan = await storage.createPrivacyScan(mockScan);
      res.json(scan);
    } catch (error) {
      res.status(500).json({ message: "Failed to perform privacy scan" });
    }
  });

  app.get("/api/privacy-scans", async (req, res) => {
    try {
      const scans = await storage.getAllPrivacyScans();
      res.json(scans);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch privacy scans" });
    }
  });

  // Tracker detection endpoints
  app.get("/api/tracker-detections/:scanId", async (req, res) => {
    try {
      const scanId = parseInt(req.params.scanId);
      const detections = await storage.getTrackerDetectionsByScanId(scanId);
      res.json(detections);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tracker detections" });
    }
  });

  app.post("/api/tracker-detections", async (req, res) => {
    try {
      const detection = insertTrackerDetectionSchema.parse(req.body);
      const newDetection = await storage.createTrackerDetection(detection);
      res.json(newDetection);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid tracker detection data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create tracker detection" });
      }
    }
  });

  // System status endpoints
  app.get("/api/system-status", async (req, res) => {
    try {
      const status = await storage.getSystemStatus();
      res.json(status);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch system status" });
    }
  });

  app.put("/api/system-status", async (req, res) => {
    try {
      const statusUpdate = insertSystemStatusSchema.parse(req.body);
      const updatedStatus = await storage.updateSystemStatus(statusUpdate);
      res.json(updatedStatus);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid system status data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to update system status" });
      }
    }
  });

  // Matrix data stream endpoint
  app.get("/api/matrix-stream", async (req, res) => {
    try {
      // Generate random matrix-style data
      const characters = '0123456789ABCDEF';
      const streamData = [];
      
      for (let i = 0; i < 10; i++) {
        let line = '0x';
        for (let j = 0; j < Math.floor(Math.random() * 20) + 10; j++) {
          line += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        line += ' >> ' + (Math.random() > 0.7 ? 'BLOCKED' : Math.random() > 0.5 ? 'ALLOWED' : 'SCANNING');
        streamData.push(line);
      }
      
      res.json({ data: streamData });
    } catch (error) {
      res.status(500).json({ message: "Failed to generate matrix stream" });
    }
  });

  // Command execution endpoint (mock)
  app.post("/api/execute-command", async (req, res) => {
    try {
      const { command } = req.body;
      
      let response = "";
      const cmd = command.toLowerCase().trim();
      
      if (cmd.includes('scan')) {
        response = "Scanning complete. " + Math.floor(Math.random() * 50 + 10) + " trackers detected.";
      } else if (cmd.includes('block')) {
        response = "Successfully blocked " + Math.floor(Math.random() * 100 + 50) + " tracking attempts.";
      } else if (cmd.includes('status')) {
        response = "System status: OPERATIONAL | Privacy level: MAXIMUM";
      } else if (cmd.includes('help')) {
        response = "Available commands: scan, block, status, clear, exit";
      } else {
        response = `Command not found: ${command}. Type 'help' for available commands.`;
      }
      
      res.json({ command, response });
    } catch (error) {
      res.status(500).json({ message: "Failed to execute command" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
