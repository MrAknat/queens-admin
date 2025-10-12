import {
  AlertTriangle,
  BarChart3,
  CheckCircle,
  Crown,
  Info,
  Palette,
  Settings,
  Users,
  XCircle,
} from "lucide-react";
import { ThemeDemo } from "@/components/theme-demo";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm supports-[backdrop-filter]:bg-card/80">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-primary/10">
                <Crown className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  Queens
                </h1>
                <p className="text-xs text-muted-foreground">
                  Queens Control Panel
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="hidden sm:flex items-center space-x-2 text-sm text-muted-foreground">
                <Palette className="h-4 w-4" />
                <span>Theme:</span>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-12">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <CheckCircle className="mr-2 h-4 w-4" />
              Teal/Cyan Brand Theme Active
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight">
              Modern Admin Dashboard
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Built with Next.js 15, TypeScript, and Tailwind CSS featuring a
              comprehensive teal/cyan brand theme with perfect light/dark mode
              support.
            </p>
          </div>
          <div className="bg-card rounded-lg border shadow-sm p-8">
            <h3 className="text-2xl font-semibold mb-6 flex items-center">
              <Palette className="mr-3 h-6 w-6 text-primary" />
              Brand Color Palette
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Primary Colors */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm uppercase tracking-wide text-muted-foreground">
                  Primary
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded bg-primary shadow-sm"></div>
                    <div>
                      <div className="font-medium text-sm">Primary</div>
                      <div className="text-xs text-muted-foreground">
                        #00BCD4
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded bg-primary-600 shadow-sm"></div>
                    <div>
                      <div className="font-medium text-sm">Primary 600</div>
                      <div className="text-xs text-muted-foreground">
                        #0097A7
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-sm uppercase tracking-wide text-muted-foreground">
                  Secondary
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded bg-secondary shadow-sm"></div>
                    <div>
                      <div className="font-medium text-sm">Secondary</div>
                      <div className="text-xs text-muted-foreground">
                        #006064
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded bg-accent shadow-sm"></div>
                    <div>
                      <div className="font-medium text-sm">Accent</div>
                      <div className="text-xs text-muted-foreground">
                        #B2EBF2
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-sm uppercase tracking-wide text-muted-foreground">
                  Semantic
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded bg-success shadow-sm"></div>
                    <div>
                      <div className="font-medium text-sm">Success</div>
                      <div className="text-xs text-muted-foreground">Green</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded bg-warning shadow-sm"></div>
                    <div>
                      <div className="font-medium text-sm">Warning</div>
                      <div className="text-xs text-muted-foreground">Amber</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-sm uppercase tracking-wide text-muted-foreground">
                  System
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded bg-error shadow-sm"></div>
                    <div>
                      <div className="font-medium text-sm">Error</div>
                      <div className="text-xs text-muted-foreground">Red</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded bg-info shadow-sm"></div>
                    <div>
                      <div className="font-medium text-sm">Info</div>
                      <div className="text-xs text-muted-foreground">Blue</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-card border rounded-lg p-4 hover:shadow-md transition-all duration-200">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded bg-success/10">
                  <CheckCircle className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="font-medium">Success State</p>
                  <p className="text-sm text-muted-foreground">
                    All systems operational
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-card border rounded-lg p-4 hover:shadow-md transition-all duration-200">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded bg-warning/10">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="font-medium">Warning State</p>
                  <p className="text-sm text-muted-foreground">
                    Attention required
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-card border rounded-lg p-4 hover:shadow-md transition-all duration-200">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded bg-error/10">
                  <XCircle className="h-5 w-5 text-error" />
                </div>
                <div>
                  <p className="font-medium">Error State</p>
                  <p className="text-sm text-muted-foreground">
                    Issue detected
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-card border rounded-lg p-4 hover:shadow-md transition-all duration-200">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded bg-info/10">
                  <Info className="h-5 w-5 text-info" />
                </div>
                <div>
                  <p className="font-medium">Info State</p>
                  <p className="text-sm text-muted-foreground">
                    Information available
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="group bg-card border rounded-lg p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">User Management</h3>
              </div>
              <p className="text-muted-foreground">
                Comprehensive user management with role-based permissions and
                intuitive controls.
              </p>
            </div>
            <div className="group bg-card border rounded-lg p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                  <BarChart3 className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold">Analytics Dashboard</h3>
              </div>
              <p className="text-muted-foreground">
                Real-time analytics with beautiful charts and comprehensive
                reporting features.
              </p>
            </div>
            <div className="group bg-card border rounded-lg p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 md:col-span-2 lg:col-span-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/20">
                  <Settings className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold">Configuration</h3>
              </div>
              <p className="text-muted-foreground">
                Easy-to-use configuration panel with theme customization and
                system settings.
              </p>
            </div>
          </div>
          <ThemeDemo />
          <div className="bg-card rounded-lg border p-8">
            <h3 className="text-2xl font-semibold mb-6">
              Design System Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h4 className="font-semibold text-primary">
                  Minimalistic Design
                </h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Thin 1px borders throughout</li>
                  <li>• Maximum 8px rounded corners</li>
                  <li>• Clean typography scale</li>
                  <li>• Subtle shadows and effects</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-primary">High Contrast</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• WCAG compliant color ratios</li>
                  <li>• Clear visual hierarchy</li>
                  <li>• Accessible focus states</li>
                  <li>• Semantic color usage</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-primary">Theme System</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• CSS variable based</li>
                  <li>• Smooth theme transitions</li>
                  <li>• System preference detection</li>
                  <li>• Persistent theme storage</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
