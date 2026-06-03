/** Mirrors backend jobTitlesSchema: title, description, isActive, timestamps */
export type JobTitleRecord = {
    _id: string;
    title: string;
    description?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
};

export const jobTitlesSeed: JobTitleRecord[] = [
    {
        _id: "jt-1",
        title: "Sales Agent",
        description: "Handles property sales listings and client negotiations.",
        isActive: true,
        createdAt: "2025-11-02T10:00:00.000Z",
        updatedAt: "2026-01-15T08:30:00.000Z",
    },
    {
        _id: "jt-2",
        title: "Senior Property Consultant",
        description: "Senior role for high-value residential and commercial deals.",
        isActive: true,
        createdAt: "2025-11-10T14:20:00.000Z",
        updatedAt: "2026-02-01T11:00:00.000Z",
    },
    {
        _id: "jt-3",
        title: "Leasing Specialist",
        description: "Focuses on rental agreements and tenant management.",
        isActive: true,
        createdAt: "2025-12-01T09:15:00.000Z",
        updatedAt: "2026-01-20T16:45:00.000Z",
    },
    {
        _id: "jt-4",
        title: "Property Advisor",
        description: "Advises buyers on market trends and investment opportunities.",
        isActive: false,
        createdAt: "2025-10-18T12:00:00.000Z",
        updatedAt: "2025-12-28T10:10:00.000Z",
    },
    {
        _id: "jt-5",
        title: "Sales Manager",
        description: "Leads the sales team and oversees quarterly targets.",
        isActive: true,
        createdAt: "2025-09-05T08:00:00.000Z",
        updatedAt: "2026-02-10T09:00:00.000Z",
    },
    {
        _id: "jt-6",
        title: "Off-Plan Specialist",
        description: "Specializes in new development and off-plan project sales.",
        isActive: false,
        createdAt: "2026-01-08T11:30:00.000Z",
        updatedAt: "2026-01-08T11:30:00.000Z",
    },
    {
        _id: "jt-7",
        title: "Commercial Broker",
        description: "Commercial property transactions and corporate leasing.",
        isActive: true,
        createdAt: "2026-02-12T07:45:00.000Z",
        updatedAt: "2026-02-12T07:45:00.000Z",
    },
];

export const formatJobTitleDate = (value?: string) => {
    if (!value) return "—";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "—";
    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};
