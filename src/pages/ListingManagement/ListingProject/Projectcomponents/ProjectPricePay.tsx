import { useEffect, useRef, useState } from "react";
import { CalenderIcon, LeftArrowIcon, PlusIcon, RightArrowIcon, TrashIcon } from "../../../../assets/icons";

const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

const formatDisplayDate = (date: Date) =>
    date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

const monthTitle = (date: Date) =>
    `${date.toLocaleString("en-US", { month: "long" })}(${date.getFullYear()})`;

const getCalendarCells = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const cells: Array<number | null> = [];

    for (let i = 0; i < firstDayIndex; i += 1) cells.push(null);
    for (let day = 1; day <= totalDays; day += 1) cells.push(day);
    while (cells.length < 42) cells.push(null);
    return cells;
};

const parseDateString = (dateStr: string): Date => {
    if (!dateStr.trim()) return new Date();
    const parsed = new Date(dateStr);
    return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
};

type ActiveInstallmentPicker = { optionId: number; installmentId: number } | null;

type ConstructionInstallment = {
    id: number;
    percentage: string;
    date: string;
};

type PaymentOption = {
    id: number;
    downPayment: string;
    duringConstruction: string;
    constructionInstallments: ConstructionInstallment[];
    handoverValue: string;
};

const ProjectPricePay = () => {
    const [activeDatePicker, setActiveDatePicker] = useState<ActiveInstallmentPicker>(null);
    const [displayMonth, setDisplayMonth] = useState(() => new Date());
    const datePickerRef = useRef<HTMLDivElement>(null);

    const [paymentOptions, setPaymentOptions] = useState<PaymentOption[]>([
        {
            id: 1,
            downPayment: "",
            duringConstruction: "",
            constructionInstallments: [],
            handoverValue: "",
        },
    ]);

    const updateOptionField = (
        optionId: number,
        field: "downPayment" | "duringConstruction" | "handoverValue",
        value: string
    ) => {
        setPaymentOptions((prev) =>
            prev.map((option) =>
                option.id === optionId ? { ...option, [field]: value } : option
            )
        );
    };

    const updateConstructionInstallment = (
        optionId: number,
        installmentId: number,
        field: "percentage" | "date",
        value: string
    ) => {
        setPaymentOptions((prev) =>
            prev.map((option) => {
                if (option.id !== optionId) return option;
                return {
                    ...option,
                    constructionInstallments: option.constructionInstallments.map((item) =>
                        item.id === installmentId ? { ...item, [field]: value } : item
                    ),
                };
            })
        );
    };

    const addInstallment = (optionId: number) => {
        setPaymentOptions((prev) =>
            prev.map((option) => {
                if (option.id !== optionId) return option;
                return {
                    ...option,
                    constructionInstallments: [
                        ...option.constructionInstallments,
                        { id: option.constructionInstallments.length + 1, percentage: "", date: "" },
                    ],
                };
            })
        );
    };

    const deleteInstallment = (optionId: number, installmentId: number) => {
        setPaymentOptions((prev) =>
            prev.map((option) => {
                if (option.id !== optionId) return option;
                return {
                    ...option,
                    constructionInstallments: option.constructionInstallments.filter(
                        (item) => item.id !== installmentId
                    ),
                };
            })
        );
    };

    const addPaymentOption = () => {
        setPaymentOptions((prev) => [
            ...prev,
            {
                id: prev.length + 1,
                downPayment: "",
                duringConstruction: "",
                constructionInstallments: [],
                handoverValue: "",
            },
        ]);
    };

    const deletePaymentOption = (optionId: number) => {
        setPaymentOptions((prev) => prev.filter((option) => option.id !== optionId));
    };

    const calendarCells = getCalendarCells(displayMonth);

    const shiftMonth = (direction: -1 | 1) => {
        setDisplayMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + direction, 1));
    };

    const isPickerActive = (optionId: number, installmentId: number) =>
        activeDatePicker?.optionId === optionId && activeDatePicker?.installmentId === installmentId;

    const openDatePicker = (optionId: number, installmentId: number, currentDateStr: string) => {
        const isActive = isPickerActive(optionId, installmentId);
        setActiveDatePicker(isActive ? null : { optionId, installmentId });
        if (!isActive) {
            const sourceDate = parseDateString(currentDateStr);
            setDisplayMonth(new Date(sourceDate.getFullYear(), sourceDate.getMonth(), 1));
        }
    };

    const selectInstallmentDate = (optionId: number, installmentId: number, day: number) => {
        const selectedDate = new Date(displayMonth.getFullYear(), displayMonth.getMonth(), day);
        updateConstructionInstallment(
            optionId,
            installmentId,
            "date",
            formatDisplayDate(selectedDate)
        );
        setActiveDatePicker(null);
    };

    useEffect(() => {
        if (!activeDatePicker) return;
        const onDocMouseDown = (e: MouseEvent) => {
            if (datePickerRef.current?.contains(e.target as Node)) return;
            setActiveDatePicker(null);
        };
        document.addEventListener("mousedown", onDocMouseDown);
        return () => document.removeEventListener("mousedown", onDocMouseDown);
    }, [activeDatePicker]);

    const renderInstallmentDatePicker = (
        optionId: number,
        installmentId: number,
        dateValue: string
    ) => {
        const selectedDate = parseDateString(dateValue);
        const pickerKey = `${optionId}-${installmentId}`;
        const isActive = isPickerActive(optionId, installmentId);

        return (
            <div className="relative w-full" ref={isActive ? datePickerRef : undefined}>
                <input
                    type="text"
                    readOnly
                    value={dateValue}
                    onClick={() => openDatePicker(optionId, installmentId, dateValue)}
                    placeholder="Select"
                    className="h-[44px] w-full rounded-[10px] border border-[rgba(34,34,34,0.10)] bg-white px-[10px] pr-[36px] text-[13px] font-[Medium] text-[#222] placeholder:text-[#707070] placeholder:text-[13px] placeholder:font-[Medium] focus:outline-none cursor-pointer"
                />
                <button
                    type="button"
                    aria-label="Open calendar"
                    onClick={() => openDatePicker(optionId, installmentId, dateValue)}
                    className="absolute right-[8px] top-1/2 -translate-y-1/2 cursor-pointer p-[4px]"
                >
                    <CalenderIcon width={14} height={14} />
                </button>
                {isActive && (
                    <div className="absolute md:right-0 right-0 top-[48px] z-30 h-[320px] w-[280px] rounded-[12px] bg-white p-[20px] shadow-[0_8px_20px_rgba(0,0,0,0.12)]">
                        <div className="flex items-center justify-between mb-[16px]">
                            <button
                                type="button"
                                onClick={() => shiftMonth(-1)}
                                className="text-[16px] font-[SemiBold] text-[#222] px-[6px] rotate-180"
                            >
                                <LeftArrowIcon width={14} height={14} />
                            </button>
                            <p className="text-[16px] font-[Bold] text-[#222]">{monthTitle(displayMonth)}</p>
                            <button
                                type="button"
                                onClick={() => shiftMonth(1)}
                                className="text-[16px] font-[SemiBold] text-[#222] px-[6px]"
                            >
                                <RightArrowIcon width={14} height={14} />
                            </button>
                        </div>
                        <div className="grid grid-cols-7 gap-y-[6px] text-center">
                            {weekDays.map((d, index) => (
                                <span
                                    key={`${pickerKey}-day-${d}-${index}`}
                                    className="text-[13px] font-[SemiBold] text-[#222]"
                                >
                                    {d}
                                </span>
                            ))}
                            {calendarCells.map((day, idx) => {
                                if (!day) {
                                    return (
                                        <span
                                            key={`${pickerKey}-blank-${idx}`}
                                            className="h-[30px] w-[30px] mx-auto rounded-full border border-[rgba(34,34,34,0.10)] bg-[#FAFAFA]"
                                        />
                                    );
                                }
                                const isSelected =
                                    selectedDate.getDate() === day &&
                                    selectedDate.getMonth() === displayMonth.getMonth() &&
                                    selectedDate.getFullYear() === displayMonth.getFullYear();
                                return (
                                    <button
                                        key={`${pickerKey}-${day}-${idx}`}
                                        type="button"
                                        onClick={() => selectInstallmentDate(optionId, installmentId, day)}
                                        className={`h-[30px] w-[30px] mx-auto rounded-full text-[12px] font-[SemiBold] border transition-colors ${isSelected
                                            ? "bg-[#EA3934] text-white border-[#EA3934]"
                                            : "text-[#707070] border-[rgba(34,34,34,0.10)] hover:bg-[#F2F2F2]"
                                            }`}
                                    >
                                        {day}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div>
            {/* payment plan */}
            <div className="bg-white border border-[rgba(34,34,34,0.06)] rounded-[12px] md:p-[20px] p-[16px]">
                <h3 className="text-[20px] font-[Bold] text-[#222] mb-[14px]">Payment Plan</h3>

                <div className="flex flex-col gap-[12px]">
                    {paymentOptions.map((option) => (
                        <div key={option.id} className="">
                            <div className="flex items-center justify-between gap-3 mb-[10px]">
                                <p className="text-[14px] font-[Regular] text-[#222]">Option {option.id}</p>
                                <button
                                    type="button"
                                    onClick={() => deletePaymentOption(option.id)}
                                    className="cursor-pointer  bg-white flex items-center justify-center"
                                >
                                    <TrashIcon width={20} height={20} fill="#EA3934" />
                                </button>
                            </div>
                            <div className="rounded-[15px] bg-[#F5F5F5] md:p-[20px] p-[15px]">
                                {/* down payment and during construction */}
                                <div className="flex flex-col gap-[8px]">
                                    <div className="grid md:grid-cols-[170px_1fr] grid-cols-1 gap-[8px]">
                                        <div className="h-[44px] rounded-[8px] bg-[rgba(34,34,34,0.10)] px-[15px] text-[13px] text-[#222] font-[Medium] flex items-center">
                                            Down payment
                                        </div>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={option.downPayment}
                                                onChange={(e) => updateOptionField(option.id, "downPayment", e.target.value)}
                                                placeholder="Enter the percentage"
                                                className="h-[44px] w-full rounded-[10px] border border-[rgba(34,34,34,0.10)] bg-white px-[10px] pr-[24px] text-[13px] font-[Medium] text-[#222] placeholder:text-[#707070] placeholder:text-[13px] placeholder:font-[Medium] focus:outline-none"
                                            />
                                            <span className="absolute right-[20px] top-1/2 -translate-y-1/2 text-[12px] text-[#707070] font-[SemiBold]">%</span>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-[170px_1fr] grid-cols-1 gap-[8px]">
                                        <div className="h-[44px] rounded-[8px] bg-[rgba(34,34,34,0.10)] px-[15px] text-[13px] text-[#222] font-[Medium] flex items-center">
                                            During Construction
                                        </div>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={option.duringConstruction}
                                                onChange={(e) =>
                                                    updateOptionField(option.id, "duringConstruction", e.target.value)
                                                }
                                                placeholder="Enter the percentage"
                                                className="h-[44px] w-full rounded-[10px] border border-[rgba(34,34,34,0.10)] bg-white px-[10px] pr-[24px] text-[13px] font-[Medium] text-[#222] placeholder:text-[#707070] placeholder:text-[13px] placeholder:font-[Medium] focus:outline-none"
                                            />
                                            <span className="absolute right-[20px] top-1/2 -translate-y-1/2 text-[12px] text-[#707070] font-[SemiBold]">%</span>
                                        </div>
                                    </div>
                                </div>
                                {/* construction installments */}
                                <div className="grid md:grid-cols-[170px_auto] grid-cols-1 gap-[8px]">
                                    <div></div>
                                    {option.constructionInstallments.length > 0 && (
                                        <div className=" mt-[10px] rounded-[10px] bg-white border border-[rgba(34,34,34,0.06)] md:p-[12px_24px] p-[10px_15px] flex flex-col gap-[8px]">
                                            {option.constructionInstallments.map((item, index) => (
                                                <div key={item.id} className=" grid md:grid-cols-[80px_auto] grid-cols-1 gap-[8px] items-center">
                                                    <h2 className="text-[13px] text-[#222] font-[Regular]">Installment {index + 1}</h2>
                                                    <div className="w-full flex align-center gap-[8px]">
                                                        <div className="relative">
                                                            <input
                                                                type="text"
                                                                value={item.percentage}
                                                                onChange={(e) =>
                                                                    updateConstructionInstallment(
                                                                        option.id,
                                                                        item.id,
                                                                        "percentage",
                                                                        e.target.value
                                                                    )
                                                                }
                                                                placeholder="00"
                                                                className="h-[44px] md:w-[88px] w-[70px] rounded-[10px] border border-[rgba(34,34,34,0.10)] bg-white px-[10px] pr-[24px] text-[13px] font-[Medium] text-[#222] placeholder:text-[#707070] placeholder:text-[13px] placeholder:font-[Medium] focus:outline-none"
                                                            />
                                                            <span className="absolute right-[10px] top-1/2 -translate-y-1/2 text-[12px] text-[#707070] font-[SemiBold]">%</span>
                                                        </div>
                                                        <div className="w-full gap-[8px]">
                                                            {renderInstallmentDatePicker(option.id, item.id, item.date)}
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => deleteInstallment(option.id, item.id)}
                                                            className="flex-shrink-0 w-[44px] h-[44px] bg-[#F5F5F5] rounded-[10px] flex items-center justify-center cursor-pointer"
                                                        >
                                                            <TrashIcon width={20} height={20} fill="#222222" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* add installment during construction */}
                                <div className="grid md:grid-cols-[170px_auto] grid-cols-1 gap-[8px]">
                                    <div></div>
                                    <div>
                                        <button
                                            type="button"
                                            onClick={() => addInstallment(option.id)}
                                            className="cursor-pointer w-auto mt-[8px] h-[23px] rounded-[5px] px-[8px] bg-[rgba(8,50,174,0.10)] text-[#0832AE] text-[12px] font-[SemiBold] inline-flex items-center gap-[5px]"
                                        >
                                            <PlusIcon width={12} height={12} fill="#0832AE" />
                                            Add installment during construction
                                        </button>
                                    </div>
                                </div>
                                {/* on handover */}
                                <div className="mt-[10px] grid grid-cols-[170px_1fr] gap-[8px]">
                                    <div className="h-[44px] rounded-[8px] bg-[rgba(34,34,34,0.10)] px-[15px] text-[13px] text-[#222] font-[Medium] flex items-center">
                                        On handover
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={option.handoverValue}
                                            onChange={(e) => updateOptionField(option.id, "handoverValue", e.target.value)}
                                            placeholder="Enter the percentage"
                                            className="h-[44px] w-full rounded-[10px] border border-[rgba(34,34,34,0.10)] bg-white px-[10px] pr-[24px] text-[13px] font-[Medium] text-[#222] placeholder:text-[#707070] placeholder:text-[13px] placeholder:font-[Medium] focus:outline-none"
                                        />
                                        <span className="absolute right-[20px] top-1/2 -translate-y-1/2 text-[12px] text-[#707070] font-[SemiBold]">%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    type="button"
                    onClick={addPaymentOption}
                    className="cursor-pointer mt-[12px] w-full h-[56px] rounded-[10px] border border-dashed border-[rgba(34,34,34,0.16)] text-[#0832AE] text-[13px] font-[SemiBold] inline-flex items-center justify-center gap-[7px]"
                >
                    <PlusIcon width={13} height={13} fill="#0832AE" />
                    Add another payment option
                </button>
            </div>
        </div>
    );
};

export default ProjectPricePay; 
