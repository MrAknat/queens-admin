"use client";

import { AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react";
import { Button } from "@/components/button";

export function ThemeDemo() {
  return (
    <div className="bg-card rounded-lg border p-8">
      <h3 className="text-2xl font-semibold mb-6">Interactive Theme Demo</h3>

      {/* Button Variants */}
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold mb-3 text-primary">Button Variants</h4>
          <div className="flex flex-wrap gap-3">
            <Button variant="default">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="accent">Accent</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-primary">Semantic Colors</h4>
          <div className="flex flex-wrap gap-3">
            <Button variant="success">
              <CheckCircle className="mr-2 h-4 w-4" />
              Success
            </Button>
            <Button variant="warning">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Warning
            </Button>
            <Button variant="error">
              <XCircle className="mr-2 h-4 w-4" />
              Error
            </Button>
            <Button variant="info">
              <Info className="mr-2 h-4 w-4" />
              Info
            </Button>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-primary">Button Sizes</h4>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
          </div>
        </div>
      </div>

      {/* Interactive Elements Demo */}
      <div className="mt-8 pt-6 border-t">
        <h4 className="font-semibold mb-4 text-primary">
          Interactive Elements
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label
              htmlFor="demo-text-input"
              className="block text-sm font-medium text-foreground"
            >
              Text Input
            </label>
            <input
              id="demo-text-input"
              type="text"
              placeholder="Enter text here..."
              className="w-full rounded border border-input bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
            />
          </div>

          <div className="space-y-3">
            <label
              htmlFor="demo-select"
              className="block text-sm font-medium text-foreground"
            >
              Select Dropdown
            </label>
            <select
              id="demo-select"
              className="w-full rounded border border-input bg-background px-3 py-2 text-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
            >
              <option>Choose an option</option>
              <option>Light Theme</option>
              <option>Dark Theme</option>
              <option>System Theme</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
