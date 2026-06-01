export type StatCard = {
    title: string;
    value: string;
    growth: string;
    growthUp: boolean;
    cardBg: string;
    iconBg: string;
};

export const dashboardStatCards: StatCard[] = [
    {
        title: "Total Users",
        value: "12,450",
        growth: "+12.4%",
        growthUp: true,
        cardBg: "bg-[#F3EEFF]",
        iconBg: "bg-[#6A3CA8]",
    },
    {
        title: "Active Listings",
        value: "8,320",
        growth: "+8.1%",
        growthUp: true,
        cardBg: "bg-[#E8F5EE]",
        iconBg: "bg-[#00A663]",
    },
    {
        title: "Total Projects",
        value: "320",
        growth: "+5.2%",
        growthUp: true,
        cardBg: "bg-[#E8F0FF]",
        iconBg: "bg-[#0832AE]",
    },
    {
        title: "Pending Reports",
        value: "28",
        growth: "-2.0%",
        growthUp: false,
        cardBg: "bg-[#FFF2F2]",
        iconBg: "bg-[#EA3934]",
    },
];

export const platformGrowthCategories = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

export const platformGrowthSeries = [
    {
        name: "New Users",
        data: [420, 510, 480, 620, 700, 760, 820, 890, 940, 1010, 1080, 1150],
    },
    {
        name: "New Listings",
        data: [280, 340, 310, 390, 450, 470, 520, 560, 610, 640, 690, 720],
    },
];

export const userDistributionSeries = [1240, 860, 2140, 8210];
export const userDistributionLabels = ["Developers", "Agencies", "Agents", "End Users"];

export const listingsByTypeCategories = ["Buy", "Rent", "Commercial", "New Projects"];
export const listingsByTypeSeries = [
    {
        name: "Listings",
        data: [3200, 2450, 1180, 1490],
    },
];

export const reportsMonthlyCategories = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
export const reportsMonthlySeries = [
    {
        name: "Open",
        data: [12, 18, 15, 22, 19, 14],
    },
    {
        name: "Resolved",
        data: [28, 32, 30, 38, 35, 40],
    },
];

export const revenueTrendSeries = [
    {
        name: "Revenue (AED K)",
        data: [320, 380, 410, 450, 490, 520, 560, 610, 640, 680, 710, 760],
    },
];

export const cmsActivitySeries = [42, 28, 18, 12];
export const cmsActivityLabels = ["Blogs", "Team", "Legal", "Contact"];
