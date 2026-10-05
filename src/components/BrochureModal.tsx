import React, { useState, useEffect } from "react";
import { X, User, Phone, Download, ShieldCheck, AlertCircle } from "lucide-react";
import { saveContactDetails, downloadBrochure, normalizePhone } from "../services/mongoService";
import "../styles/brochure-modal.css";

export interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectName?: string;
  brochureUrl?: string;
  brochureFileName?: string;
}

export const BrochureModal: React.FC<BrochureModalProps> = ({
  isOpen,
  onClose,
  projectName = "Sangrilla Meadows",
  brochureUrl = "/sangrilla-meadows-brochure.pdf",
  brochureFileName = "sangrilla-meadows-brochure.pdf",
}) => {
  const [name, setName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setName("");
      setContactNumber("");
      setNameError("");
      setPhoneError("");
      setIsSubmitting(false);
      setIsSuccess(false);
    }
  }, [isOpen]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isSubmitting) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isSubmitting, onClose]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    let valid = true;
    const trimmedName = name.trim();
    if (!trimmedName || trimmedName.length < 2) {
      setNameError("Please enter your full name (at least 2 characters).");
      valid = false;
    } else {
      setNameError("");
    }

    const cleanPhone = normalizePhone(contactNumber);
    if (!cleanPhone || cleanPhone.length < 10) {
      setPhoneError("Please enter a valid 10-digit mobile number.");
      valid = false;
    } else {
      setPhoneError("");
    }

    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    downloadBrochure(brochureUrl, brochureFileName);

    try {
      const result = await saveContactDetails({
        name: name.trim(),
        contactNumber: contactNumber.trim(),
        project: projectName,
        source: "Brochure Modal Popup",
      });

      if (result.success) {
        setIsSuccess(true);
      } else {
        setPhoneError(result.message || "Failed to submit. Please try again.");
      }
    } catch (err: any) {
      setPhoneError(err.message || "Failed to save to database. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="brochure-modal-overlay" onClick={onClose}>
      <div
        className="brochure-modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="brochure-modal-title"
      >
        {!isSuccess && (
          <button
            type="button"
            className="brochure-modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        )}

        {!isSuccess && (
          <div className="brochure-modal-header">
            <div className="brochure-badge-row">
              <Download size={13} />
              <span>Official Project Brochure</span>
            </div>
            <h3 id="brochure-modal-title" className="brochure-modal-title">
              Download {projectName} Brochure
            </h3>
            <p className="brochure-modal-subtitle">
              Enter your name &amp; contact number below to get instant access to floor plans, masterplan, and unit specifications.
            </p>
          </div>
        )}

        {/* Modal Body */}
        <div className="brochure-modal-body">
          {isSuccess ? (
            <div className="brochure-success-box">
              <h4 className="brochure-success-title">
                <span id="brochure-modal-title">
                Thank You, {name}!
                </span>
              </h4>

              <button
                type="button"
                onClick={onClose}
                className="brochure-modal-done-btn"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              {/* Name Field */}
              <div className="brochure-form-group">
                <label className="brochure-label" htmlFor="brochure-name-input">
                  Full Name <span className="brochure-required">*</span>
                </label>
                <div className="brochure-input-wrapper">
                  <User size={18} className="brochure-input-icon" />
                  <input
                    id="brochure-name-input"
                    type="text"
                    className={`brochure-input ${nameError ? "brochure-input-error" : ""}`}
                    placeholder="e.g. Dev Patel"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (nameError) setNameError("");
                    }}
                    autoFocus
                    required
                  />
                </div>
                {nameError && (
                  <span className="brochure-error-msg">
                    <AlertCircle size={12} style={{ display: "inline", marginRight: 4 }} />
                    {nameError}
                  </span>
                )}
              </div>

              {/* Phone Field */}
              <div className="brochure-form-group">
                <label className="brochure-label" htmlFor="brochure-phone-input">
                  Contact Number <span className="brochure-required">*</span>
                </label>
                <div className="brochure-input-wrapper">
                  <Phone size={18} className="brochure-input-icon" />
                  <input
                    id="brochure-phone-input"
                    type="tel"
                    className={`brochure-input ${phoneError ? "brochure-input-error" : ""}`}
                    placeholder="e.g. 98765 43210"
                    value={contactNumber}
                    onChange={(e) => {
                      setContactNumber(e.target.value);
                      if (phoneError) setPhoneError("");
                    }}
                    required
                  />
                </div>
                {phoneError && (
                  <span className="brochure-error-msg">
                    <AlertCircle size={12} style={{ display: "inline", marginRight: 4 }} />
                    {phoneError}
                  </span>
                )}
              </div>

              {/* Privacy Note */}
              <div className="brochure-privacy-note">
                <ShieldCheck size={16} color="#10b981" />
                <span>
                  Your contact details are encrypted and kept strictly confidential. No spam guaranteed.
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="brochure-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="brochure-spinner" />
                    <span>Saving Details &amp; Downloading...</span>
                  </>
                ) : (
                  <>
                    <Download size={18} />
                    <span>Submit &amp; Download Brochure</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrochureModal;
