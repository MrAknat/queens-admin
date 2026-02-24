"use client";

import {
  ArrowRight,
  Car,
  CheckCircle2,
  ExternalLink,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  useRavinInspectionStatus,
  useRequestRavinLink,
} from "@/hooks/useRavinInspection";
import { AUSTRALIAN_STATES } from "@/lib/constants";

type Step = "plate" | "ravin-link" | "waiting" | "success";

export default function InspectionPage() {
  const [step, setStep] = useState<Step>("plate");
  const [plateNumber, setPlateNumber] = useState("");
  const [state, setState] = useState("QLD");
  const [ravinUrl, setRavinUrl] = useState("");

  const requestLinkMutation = useRequestRavinLink();

  // Enabled only when we are in the "waiting" step
  const {
    data: statusData,
    isFetching: isCheckingStatus,
    refetch: manualCheckStatus,
  } = useRavinInspectionStatus(plateNumber.toUpperCase(), step === "waiting");

  const handleRequestLink = async () => {
    if (!plateNumber) return;

    try {
      const result = await requestLinkMutation.mutateAsync({
        plateNumber,
        state,
      });
      setRavinUrl(`https://${result.url}`);
      setStep("ravin-link");
    } catch (err) {
      console.error("Failed to request link:", err);
    }
  };

  // Effect to handle success transition
  useEffect(() => {
    if (statusData?.found && step === "waiting") {
      setStep("success");
    }
  }, [statusData, step]);

  const isLoading = requestLinkMutation.isPending;
  const error = requestLinkMutation.error?.message;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background via-muted/50 to-background p-4 sm:p-8">
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-30 pointer-events-none" />

      <div className="w-full max-w-lg space-y-8 relative z-10 transition-all duration-500 ease-in-out">
        <div className="flex flex-col items-center space-y-4 text-center">
          <Link href="/dashboard" className="mb-4">
            <div className="rounded-2xl bg-primary shadow-lg shadow-primary/20 p-4 transition-transform hover:scale-105 active:scale-95">
              <Car className="h-10 w-10 text-primary-foreground" />
            </div>
          </Link>
          <div className="space-y-1">
            <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Vehicle Inspection
            </h1>
            <p className="text-muted-foreground text-lg italic">
              Streamlined Ravin Assessment Flow
            </p>
          </div>
        </div>

        <Card className="border-none shadow-2xl shadow-primary/5 bg-card/80 backdrop-blur-md overflow-hidden relative border-t border-primary/20">
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 h-1 bg-muted w-full">
            <div
              className="h-full bg-primary transition-all duration-700 ease-in-out"
              style={{
                width:
                  step === "plate"
                    ? "25%"
                    : step === "ravin-link"
                      ? "50%"
                      : step === "waiting"
                        ? "75%"
                        : "100%",
              }}
            />
          </div>

          <CardHeader className="pt-8 px-8 pb-4">
            <div className="flex justify-between items-start w-full">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold">
                  {step === "plate" && "Initial Registration"}
                  {step === "ravin-link" && "Assessment Link"}
                  {step === "waiting" && "Syncing Results"}
                  {step === "success" && "Success!"}
                </h2>
                <p className="text-base text-muted-foreground">
                  {step === "plate" && "What is the vehicle's plate number?"}
                  {step === "ravin-link" &&
                    "Complete the inspection on Ravin mobile app"}
                  {step === "waiting" && "Detecting new inspection report..."}
                  {step === "success" &&
                    "Vehicle and appraisal added successfully"}
                </p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center font-bold text-primary text-xl shadow-inner flex-shrink-0">
                {step === "plate"
                  ? "1"
                  : step === "ravin-link"
                    ? "2"
                    : step === "waiting"
                      ? "3"
                      : "✓"}
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-8 pt-4 space-y-8">
            {step === "plate" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-3">
                  <Input
                    placeholder="PLATE NUMBER"
                    value={plateNumber}
                    onChange={(e) =>
                      setPlateNumber(e.target.value.toUpperCase())
                    }
                    className="h-20 text-center text-4xl font-black uppercase tracking-tighter sm:tracking-widest rounded-2xl border-2 border-muted focus:border-primary transition-all bg-muted/30"
                  />
                  <div className="space-y-2">
                    <label
                      htmlFor="state-select"
                      className="text-xs font-bold uppercase text-muted-foreground ml-1"
                    >
                      State
                    </label>
                    <Select
                      id="state-select"
                      options={[...AUSTRALIAN_STATES]}
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="h-12 text-lg font-bold rounded-2xl border-2 border-muted focus:border-primary transition-all bg-muted/20 text-center uppercase tracking-wide px-4 appearance-none"
                    />
                  </div>
                  {error && (
                    <p className="text-sm text-destructive font-semibold text-center mt-2 animate-bounce">
                      {error}
                    </p>
                  )}
                </div>
                <Button
                  className="w-full h-16 text-xl font-bold rounded-2xl shadow-lg shadow-primary/25 transition-all hover:translate-y-[-2px] hover:shadow-primary/40"
                  onClick={handleRequestLink}
                  disabled={!plateNumber || isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                  ) : (
                    <>
                      Request Inspection <ArrowRight className="ml-2 h-6 w-6" />
                    </>
                  )}
                </Button>
              </div>
            )}

            {step === "ravin-link" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="rounded-2xl bg-muted/40 p-6 border-2 border-dashed border-primary/20 text-center group">
                  <p className="text-base font-semibold text-muted-foreground mb-4">
                    A unique inspection link has been generated
                  </p>
                  <a
                    href={ravinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full"
                  >
                    <Button
                      variant="primary"
                      className="w-full h-16 text-xl font-bold rounded-xl shadow-lg shadow-primary/20 group-hover:scale-[1.02] transition-transform"
                    >
                      Open Ravin App <ExternalLink className="ml-2 h-6 w-6" />
                    </Button>
                  </a>
                </div>
                <div className="text-center space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Once you finish the photos in the Ravin app, click below:
                  </p>
                  <Button
                    variant="outline"
                    className="w-full h-16 text-lg font-bold rounded-2xl border-2 hover:bg-muted"
                    onClick={() => setStep("waiting")}
                  >
                    Photos Submitted <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            )}

            {step === "waiting" && (
              <div className="flex flex-col items-center py-10 space-y-6 text-center animate-in fade-in zoom-in-95 duration-500">
                <div className="relative h-24 w-24">
                  <div className="absolute inset-0 rounded-full border-4 border-primary/10" />
                  <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin shadow-lg shadow-primary/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="h-10 w-10 text-primary animate-pulse" />
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-2xl font-bold">Checking Database</p>
                  <p className="text-muted-foreground italic max-w-[280px]">
                    Our system will automatically detect when the report is
                    finalized by Ravin.
                  </p>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => manualCheckStatus()}
                  disabled={isCheckingStatus}
                  className="mt-4 hover:bg-primary/5 text-primary hover:text-primary font-bold"
                >
                  {isCheckingStatus ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    "Check Manually Now"
                  )}
                </Button>
              </div>
            )}

            {step === "success" && (
              <div className="flex flex-col items-center py-6 space-y-8 text-center animate-in zoom-in duration-500">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-500 rounded-full blur-2xl opacity-20 animate-pulse" />
                  <div className="relative rounded-3xl bg-green-500/10 p-6 border-2 border-green-500/20">
                    <CheckCircle2 className="h-20 w-20 text-green-500" />
                  </div>
                </div>
                <div className="space-y-3">
                  <h2 className="text-3xl font-black text-green-600 dark:text-green-400">
                    Everything Ready!
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Vehicle{" "}
                    <span className="font-bold text-foreground underline decoration-primary underline-offset-4">
                      {plateNumber}
                    </span>{" "}
                    and its new appraisal have been saved.
                  </p>
                </div>
                <div className="flex flex-col w-full gap-4">
                  <Link href="/dashboard" className="w-full">
                    <Button
                      variant="primary"
                      className="w-full h-16 text-xl font-bold rounded-2xl shadow-lg shadow-primary/25"
                    >
                      Return to Dashboard
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="h-14 bg-transparent border-2 border-muted rounded-2xl text-lg font-bold"
                    onClick={() => {
                      setStep("plate");
                      setPlateNumber("");
                    }}
                  >
                    Inspect Another Vehicle
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {step !== "success" && (
          <div className="text-center scale-up-hover transition-all">
            <Link
              href="/dashboard"
              className="text-base font-semibold text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-2 group"
            >
              <span className="h-px w-8 bg-muted group-hover:bg-primary transition-colors" />
              Cancel and Exit
              <span className="h-px w-8 bg-muted group-hover:bg-primary transition-colors" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
