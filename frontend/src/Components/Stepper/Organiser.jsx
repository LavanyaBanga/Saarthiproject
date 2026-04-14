import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { Check, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const colors = {
  bg: "#776982",
  card: "#C7B9D6",
  text: "#4B4155",
  highlight: "#9B6EB4",
  lightCard: "#F8F5FB",
  border: "#A597D4",
};

function OptionBox({ id, title, subtitle, selected, onClick }) {
    const ref = useRef(null);

    useEffect(() => {
        gsap.killTweensOf(ref.current);

        if (selected) {
            gsap.to(ref.current, {
                duration: 0.35,
                scale: 1.03,
                boxShadow: `0 12px 30px ${colors.highlight}40`,
                background: colors.highlight,
                color: "#fff",
                borderColor: "transparent",
                ease: "power2.out",
            });
        } else {
            gsap.to(ref.current, {
                duration: 0.35,
                scale: 1,
                boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
                background: colors.lightCard,
                color: colors.text,
                borderColor: colors.border,
                ease: "power2.out",
            });
        }
    }, [selected]);

    const handleMouseEnter = () => {
        if (!selected) {
            gsap.to(ref.current, { scale: 1.02, duration: 0.18, ease: "power2.out" });
        }
    };

    const handleMouseLeave = () => {
        if (!selected) {
            gsap.to(ref.current, { scale: 1, duration: 0.18, ease: "power2.out" });
        }
    };

    return (
        <button
            ref={ref}
            onClick={() => onClick(id)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="w-full text-left rounded-xl border px-6 py-5 cursor-pointer transition-all select-none"
            type="button"
            aria-pressed={selected ? "true" : "false"}
            style={{
                background: selected ? colors.highlight : colors.lightCard,
                color: selected ? "#fff" : colors.text,
                borderColor: selected ? "transparent" : colors.border,
            }}
        >
            <div className="flex items-center gap-4">
                <div
                    className="w-12 h-12 flex items-center justify-center rounded-full shrink-0 border"
                    style={{
                        borderColor: selected ? colors.lightCard : colors.border,
                        background: selected ? colors.lightCard : "transparent",
                    }}
                >
                    <span style={{ fontSize: 18, color: selected ? colors.text : colors.highlight }}>
                        {title?.[0]?.toUpperCase()}
                    </span>
                </div>
                <div className="grow">
                    <div className="font-semibold text-lg leading-tight" style={{ color: selected ? "#fff" : colors.text }}>
                        {title}
                    </div>
                    {subtitle && (
                        <div className="text-sm mt-1" style={{ color: selected ? colors.lightCard : colors.text }}>
                            {subtitle}
                        </div>
                    )}
                </div>

                <div className="w-8 h-8 flex items-center justify-center">
                    {selected ? (
                        <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.lightCard }}>
                            <Check size={14} style={{ color: colors.highlight }} />
                        </div>
                    ) : (
                        <div
                            className="w-6 h-6 rounded-full border"
                            style={{ borderColor: colors.border }}
                        />
                    )}
                </div>
            </div>
        </button>
    );
}

export default function OrganizationStepperForm() {
    const steps = [
        {
            key: "orgName",
            title: "Organization Name",
            subtitle: "What is your choice organization's name?",
            type: "input",
            fields: [{ key: "orgName", label: "Organization Name", placeholder: "e.g., Saarthi Wellness" }],
        },
        {
            key: "location",
            title: "Location",
            subtitle: "Where is the organization located?",
            type: "input",
            fields: [{ key: "location", label: "Location", placeholder: "City, Country" }],
        },
        {
            key: "diseaseFocus",
            title: "Disease Focus",
            subtitle: "What diseases does your organization focus on?",
            type: "input",
            fields: [{ key: "diseaseFocus", label: "Disease Focus", placeholder: "e.g., Diabetes, Hypertension" }],
        },
        {
            key: "PreBookedOrNot",
            title: "PreBooked Program",
            subtitle: "Do you have any existing PreBooked appointments with us?",
            type: "options",
            multi: false,
            options: [
                { id: "yes", title: "Yes", subtitle: "We have a pre-existing program." },
                { id: "no", title: "No", subtitle: "This is the first time." },
            ],
        },
      
    ];

    const [formData, setFormData] = useState({
        orgName: "",
        diseaseFocus: "",
        location: "",
        existingProgram: null,
        password: "",
        confirmPassword: "",
    });
    const [currentStep, setCurrentStep] = useState(0);
    const [fieldError, setFieldError] = useState("");

    const canProceed = () => {
        const step = steps[currentStep];
        if (!step) return false;

        const value = formData[step.key];

        if (step.type === "options") {
            return !!value;
        } else {
            if (!value || value.length === 0) return false;
            if (step.key === "employees") {
                if (isNaN(Number(value)) || Number(value) <= 0) return false;
            }
            if (step.key === "password" || step.key === "confirmPassword") {
                if (value.length < 6) return false; // Basic password length check
            }
        }
        return true;
    };

    const handleNext = () => {
        if (canProceed()) {
            if (currentStep === steps.findIndex(s => s.key === "confirmPassword")) {
                if (formData.password !== formData.confirmPassword) {
                    setFieldError("Passwords do not match.");
                    return;
                }
            }
            setFieldError("");
            if (currentStep < steps.length - 1) {
                setCurrentStep((s) => s + 1);
            } else {
                console.log("Form Submitted", formData);
            }
        } else {
            const step = steps[currentStep];
            if (step.type === "options") {
                setFieldError("Please select an option.");
            } else if (!formData[step.key]) {
                setFieldError("This field cannot be empty.");
            } else if (step.key === "employees" && (isNaN(Number(formData[step.key])) || Number(formData[step.key]) <= 0)) {
                setFieldError("Please enter a valid number of employees.");
            } else if (step.key === "password" || step.key === "confirmPassword") {
                 setFieldError("Password must be at least 6 characters long.");
            }
        }
    };

    const handleOptionToggle = (stepKey, optionId) => {
        setFormData((prev) => ({ ...prev, [stepKey]: optionId }));
    };

    const handleFieldChange = (key, value) => {
        setFormData((p) => ({ ...p, [key]: value }));
    };

    const prev = () => {
        if (currentStep > 0) setCurrentStep((s) => s - 1);
    };

    const isCompleted = (index) => {
        const step = steps[index];
        if (!step) return false;
        
        const value = formData[step.key];
        if (step.type === "options") {
          return !!value;
        }
        return value !== undefined && value !== null && value !== "";
    };

    return (
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: colors.bg }}>
            <div className="w-full max-w-4xl rounded-3xl shadow-2xl p-8" style={{ backgroundColor: colors.card, border: `1px solid ${colors.border}` }}>
                <div className="flex items-center justify-between mb-8 gap-4">
                    {steps.map((s, idx) => {
                        const completed = isCompleted(idx);
                        const active = idx === currentStep;
                        return (
                            <div key={s.key} className="flex-1 flex flex-col items-center relative px-2">
                                {/* connecting line */}
                                {idx < steps.length - 1 && (
                                    <div
                                        className={`absolute top-4 left-1/2 right-[-50%] h-[3px] transform -translate-x-1/2`}
                                        style={{ width: "100%", backgroundColor: idx < currentStep ? colors.highlight : colors.border }}
                                    />
                                )}

                                <div
                                    className={`w-10 h-10 rounded-full z-10 flex items-center justify-center transition-all`}
                                    style={{
                                      backgroundColor: completed ? "green" : active ? colors.highlight : colors.lightCard,
                                      color: completed ? "white" : active ? "white" : colors.text
                                    }}
                                >
                                    {completed ? <Check size={16} /> : idx + 1}
                                </div>
                                <div className="mt-2 text-sm text-center" style={{ color: colors.text }}>{s.title}</div>
                            </div>
                        );
                    })}
                </div>

                <div className="border rounded-2xl p-8" style={{ backgroundColor: colors.lightCard, border: `1px solid ${colors.border}` }}>
        
                    <div className="mb-6">
                        <div className="text-sm" style={{ color: colors.text }}>Step {currentStep + 1}/{steps.length}</div>
                        <h2 className="text-2xl md:text-3xl font-bold mt-2" style={{ color: colors.text }}>
                            {steps[currentStep].title}
                        </h2>
                        <p className="mt-2" style={{ color: colors.text }}>{steps[currentStep].subtitle}</p>
                    </div>


                    <div className="min-h-[220px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={steps[currentStep].key}
                                initial={{ opacity: 0, x: 40 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -40 }}
                                transition={{ duration: 0.35 }}
                                className="w-full"
                            >
                              
                                {steps[currentStep].type === "input" && (
                                    <div className="space-y-4 max-w-2xl">
                                        {steps[currentStep].fields.map((f) => (
                                            <div key={f.key}>
                                                <label className="block mb-2" style={{ color: colors.text }}>{f.label}</label>
                                                <input
                                                    type={f.inputType || "text"}
                                                    value={formData[f.key] || ""}
                                                    onChange={(e) => handleFieldChange(f.key, e.target.value)}
                                                    placeholder={f.placeholder}
                                                    className="w-full px-4 py-3 rounded-xl outline-none border"
                                                    style={{ backgroundColor: colors.card, color: colors.text, borderColor: colors.border }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}

                               
                                {steps[currentStep].type === "options" && (
                                    <div className="grid gap-4 md:grid-cols-2 mt-2">
                                        {steps[currentStep].options.map((opt) => {
                                            const stepKey = steps[currentStep].key;
                                            const selected = formData[stepKey] === opt.id;
                                            return (
                                                <OptionBox
                                                    key={opt.id}
                                                    id={opt.id}
                                                    title={opt.title}
                                                    subtitle={opt.subtitle}
                                                    selected={selected}
                                                    onClick={(id) => handleOptionToggle(stepKey, id)}
                                                />
                                            );
                                        })}
                                    </div>
                                )}
                                {fieldError && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex items-center gap-2 text-sm text-red-500 mt-2"
                                    >
                                        <AlertTriangle size={16} /> {fieldError}
                                    </motion.div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Footer nav */}
                    <div className="flex items-center justify-between mt-8">
                        <Button
                            onClick={prev}
                            disabled={currentStep === 0}
                            className={`px-6 py-3 rounded-xl font-medium transition ${
                                currentStep === 0
                                    ? "cursor-not-allowed"
                                    : "hover:bg-opacity-80"
                                }`}
                            style={{
                                backgroundColor: colors.highlight,
                                color: 'white',
                                opacity: currentStep === 0 ? 0.5 : 1,
                            }}
                        >
                            Back
                        </Button>

                        <div className="flex items-center gap-4">
                            <div className="text-center">
                                <div className="text-sm font-semibold" style={{ color: colors.text }}>Progress</div>
                                <div className="text-sm font-semibold" style={{ color: colors.highlight }}>
                                    {Math.round(((currentStep + 1) / steps.length) * 100)}%
                                </div>
                            </div>

                            <Button
                                onClick={handleNext}
                                disabled={!canProceed()}
                                className={`px-8 py-3 rounded-xl font-semibold transition ${!canProceed()
                                        ? "cursor-not-allowed"
                                        : "hover:scale-[1.02]"
                                    }`}
                                style={{
                                  backgroundColor: colors.highlight,
                                  color: 'white',
                                  opacity: !canProceed() ? 0.5 : 1,
                                }}
                            >
                                {currentStep === steps.length - 1 ? "Finish" : "Next"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}