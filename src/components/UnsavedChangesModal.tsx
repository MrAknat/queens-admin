"use client";

import { AlertTriangle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";

interface UnsavedChangesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onCancel: () => void;
}

export function UnsavedChangesModal({
  isOpen,
  onClose,
  onConfirm,
  onCancel,
}: UnsavedChangesModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  const modal = (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity" />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 transform transition-all">
        {/* Header */}
        <div className="flex items-center gap-3 p-6 border-b">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-6 w-6 text-amber-500" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">
              Unsaved Changes
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex-shrink-0 p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 mb-4">
            You have unsaved changes that will be lost if you navigate away from
            this page. Are you sure you want to continue?
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h4 className="font-medium text-amber-800 mb-2">
              Changes that will be lost:
            </h4>
            <ul className="text-sm text-amber-700 space-y-1">
              <li>• Vehicle information updates</li>
              <li>• Reconditioning form entries</li>
              <li>• Any unsaved form data</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t bg-gray-50 rounded-b-lg">
          <Button variant="outline" onClick={onCancel} className="flex-1">
            Stay on Page
          </Button>
          <Button
            variant="primary"
            onClick={onConfirm}
            className="flex-1 bg-red-600 hover:bg-red-700 border-red-600"
          >
            Leave Page
          </Button>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}

// Hook for managing unsaved changes navigation
export function useUnsavedChanges(hasUnsavedChanges: boolean) {
  const [showModal, setShowModal] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<
    (() => void) | null
  >(null);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = "";
        return "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const handleNavigation = (navigationFn: () => void) => {
    if (hasUnsavedChanges) {
      setShowModal(true);
      setPendingNavigation(() => navigationFn);
    } else {
      navigationFn();
    }
  };

  const handleConfirmNavigation = () => {
    setShowModal(false);
    if (pendingNavigation) {
      pendingNavigation();
    }
    setPendingNavigation(null);
  };

  const handleCancelNavigation = () => {
    setShowModal(false);
    setPendingNavigation(null);
  };

  return {
    showModal,
    setShowModal,
    handleNavigation,
    handleConfirmNavigation,
    handleCancelNavigation,
  };
}
