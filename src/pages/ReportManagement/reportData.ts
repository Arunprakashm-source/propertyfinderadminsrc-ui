export type ReportType = "property" | "agent" | "agency" | "user" | "review" | "project";
export type UserType = "developer" | "agency" | "agent" | "user";
export type ReportStatus =
    | "pending"
    | "under-review"
    | "reviewed"
    | "resolved"
    | "rejected"
    | "escalated";
export type ReportPriority = "low" | "medium" | "high" | "urgent";

export type InternalNote = {
    note: string;
    addedBy: string;
    addedAt: string;
};

export type Report = {
    id: string;
    reportedBy?: string;
    reporterEmail: string;
    reportType: ReportType;
    reportedItemId: string;
    reportedItemLabel: string;
    userType: UserType;
    reason: string;
    description: string;
    attachments: string[];
    status: ReportStatus;
    priority: ReportPriority;
    reviewedBy?: string;
    reviewNotes?: string;
    reviewedAt?: string;
    actionTaken?: string;
    resolution?: {
        status: string;
        notes: string;
        resolvedBy: string;
        resolvedAt: string;
    };
    internalNotes: InternalNote[];
    createdAt: string;
    updatedAt: string;
};

export const REPORT_STATUSES: ReportStatus[] = [
    "pending",
    "under-review",
    "reviewed",
    "resolved",
    "rejected",
    "escalated",
];

export const REPORT_PRIORITIES: ReportPriority[] = ["low", "medium", "high", "urgent"];

export const REPORT_TYPES: ReportType[] = [
    "property",
    "agent",
    "agency",
    "user",
    "review",
    "project",
];

export const USER_TYPES: UserType[] = ["developer", "agency", "agent", "user"];

export const reportsSeed: Report[] = [
    {
        id: "RPT-1001",
        reporterEmail: "buyer.john@email.com",
        reportType: "property",
        reportedItemId: "64a1f2b3c4d5e6f7a8b9c0d1",
        reportedItemLabel: "Luxury Villa — Palm Jumeirah",
        userType: "user",
        reason: "Fraud / misleading listing",
        description:
            "The listed price and amenities do not match what was shown during the site visit. Photos appear heavily edited.",
        attachments: [
            "https://picsum.photos/seed/rpt1a/400/300",
            "https://picsum.photos/seed/rpt1b/400/300",
        ],
        status: "pending",
        priority: "high",
        internalNotes: [],
        createdAt: "2026-05-24T10:30:00Z",
        updatedAt: "2026-05-24T10:30:00Z",
    },
    {
        id: "RPT-1002",
        reporterEmail: "agent.sarah@agency.com",
        reportType: "agent",
        reportedItemId: "64b2c3d4e5f6a7b8c9d0e1f2",
        reportedItemLabel: "Ahmed Hassan — Agent Profile",
        userType: "agency",
        reason: "Inappropriate behavior",
        description:
            "Repeated unprofessional messages to clients after being asked to stop contact.",
        attachments: ["https://picsum.photos/seed/rpt2/400/300"],
        status: "under-review",
        priority: "urgent",
        reviewedBy: "Admin — Arun",
        reviewNotes: "Escalated to compliance team for review.",
        reviewedAt: "2026-05-25T14:00:00Z",
        internalNotes: [
            {
                note: "Initial triage completed. Awaiting agent response.",
                addedBy: "Admin — Arun",
                addedAt: "2026-05-25T14:05:00Z",
            },
        ],
        createdAt: "2026-05-23T08:15:00Z",
        updatedAt: "2026-05-25T14:05:00Z",
    },
    {
        id: "RPT-1003",
        reporterEmail: "dev.contact@omniyat.com",
        reportType: "review",
        reportedItemId: "64c3d4e5f6a7b8c9d0e1f2a3",
        reportedItemLabel: "Review on Marina Heights Tower",
        userType: "developer",
        reason: "Spam / fake review",
        description: "Multiple 1-star reviews posted within minutes from new accounts.",
        attachments: [],
        status: "reviewed",
        priority: "medium",
        reviewedBy: "Admin — Priya",
        reviewNotes: "Pattern confirmed as suspicious activity.",
        reviewedAt: "2026-05-22T11:20:00Z",
        actionTaken: "Flagged reviews hidden pending verification.",
        internalNotes: [],
        createdAt: "2026-05-21T16:45:00Z",
        updatedAt: "2026-05-22T11:20:00Z",
    },
    {
        id: "RPT-1004",
        reporterEmail: "user.maria@gmail.com",
        reportType: "agency",
        reportedItemId: "64d4e5f6a7b8c9d0e1f2a3b4",
        reportedItemLabel: "Knight Frank Dubai",
        userType: "user",
        reason: "Duplicate listings",
        description: "Same property listed multiple times with different reference IDs.",
        attachments: ["https://picsum.photos/seed/rpt4/400/300"],
        status: "resolved",
        priority: "low",
        reviewedBy: "Admin — Arun",
        reviewNotes: "Duplicates merged after agency confirmation.",
        reviewedAt: "2026-05-20T09:00:00Z",
        actionTaken: "Removed duplicate listings and notified agency.",
        resolution: {
            status: "resolved",
            notes: "Agency acknowledged and corrected listings.",
            resolvedBy: "Admin — Arun",
            resolvedAt: "2026-05-20T12:30:00Z",
        },
        internalNotes: [
            {
                note: "Agency responded within 24h.",
                addedBy: "Admin — Arun",
                addedAt: "2026-05-20T12:35:00Z",
            },
        ],
        createdAt: "2026-05-19T07:00:00Z",
        updatedAt: "2026-05-20T12:35:00Z",
    },
    {
        id: "RPT-1005",
        reporterEmail: "renter.ali@email.com",
        reportType: "project",
        reportedItemId: "64e5f6a7b8c9d0e1f2a3b4c5",
        reportedItemLabel: "Creek Harbour Residences",
        userType: "user",
        reason: "Inappropriate content",
        description: "Project brochure contains offensive imagery in one section.",
        attachments: [
            "https://picsum.photos/seed/rpt5a/400/300",
            "https://picsum.photos/seed/rpt5b/400/300",
            "https://picsum.photos/seed/rpt5c/400/300",
        ],
        status: "escalated",
        priority: "urgent",
        reviewedBy: "Admin — Priya",
        reviewNotes: "Legal team notified.",
        reviewedAt: "2026-05-26T08:00:00Z",
        internalNotes: [
            {
                note: "Content temporarily hidden from public view.",
                addedBy: "Admin — Priya",
                addedAt: "2026-05-26T08:10:00Z",
            },
        ],
        createdAt: "2026-05-25T18:30:00Z",
        updatedAt: "2026-05-26T08:10:00Z",
    },
    {
        id: "RPT-1006",
        reporterEmail: "admin@example.com",
        reportType: "user",
        reportedItemId: "64f6a7b8c9d0e1f2a3b4c5d6",
        reportedItemLabel: "User — fake_profile_99",
        userType: "agent",
        reason: "Spam",
        description: "Account sending bulk promotional messages to leads.",
        attachments: [],
        status: "rejected",
        priority: "medium",
        reviewedBy: "Admin — Arun",
        reviewNotes: "Insufficient evidence provided by reporter.",
        reviewedAt: "2026-05-18T15:00:00Z",
        actionTaken: "Report closed — no violation found.",
        internalNotes: [],
        createdAt: "2026-05-17T12:00:00Z",
        updatedAt: "2026-05-18T15:00:00Z",
    },
    {
        id: "RPT-1007",
        reporterEmail: "investor.kim@corp.com",
        reportType: "property",
        reportedItemId: "64a7b8c9d0e1f2a3b4c5d6e7",
        reportedItemLabel: "Studio Apt — Business Bay",
        userType: "user",
        reason: "Scam / phishing",
        description: "Owner asked for wire transfer outside the platform before viewing.",
        attachments: ["https://picsum.photos/seed/rpt7/400/300"],
        status: "pending",
        priority: "urgent",
        internalNotes: [],
        createdAt: "2026-05-26T06:00:00Z",
        updatedAt: "2026-05-26T06:00:00Z",
    },
    {
        id: "RPT-1008",
        reporterEmail: "agency.ops@damac.com",
        reportType: "property",
        reportedItemId: "64b8c9d0e1f2a3b4c5d6e7f8",
        reportedItemLabel: "Penthouse — DAMAC Hills",
        userType: "agency",
        reason: "Incorrect information",
        description: "Square footage and bedroom count do not match title deed.",
        attachments: [],
        status: "under-review",
        priority: "medium",
        internalNotes: [],
        createdAt: "2026-05-24T14:20:00Z",
        updatedAt: "2026-05-24T14:20:00Z",
    },
];

export const formatLabel = (value: string) =>
    value
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");

export const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
