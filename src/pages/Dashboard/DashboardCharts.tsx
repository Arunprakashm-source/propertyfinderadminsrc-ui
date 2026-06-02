import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import {
    cmsActivityLabels,
    cmsActivitySeries,
    listingsByTypeCategories,
    listingsByTypeSeries,
    platformGrowthCategories,
    platformGrowthSeries,
    reportsMonthlyCategories,
    reportsMonthlySeries,
    revenueTrendSeries,
    userDistributionLabels,
    userDistributionSeries,
} from "./dashboardData";

const chartCardClass =
    "bg-white rounded-[12px] border border-[#EAEAEA] p-[20px] shadow-[0px_1px_0px_rgba(17,17,26,0.05),0px_0px_8px_rgba(17,17,26,0.06)]";

const chartTitleClass = "text-[16px] font-[Bold] text-[#222] mb-[4px]";
const chartSubtitleClass = "text-[12px] font-[Regular] text-[#707070] mb-[16px]";

const baseChartOptions: ApexOptions = {
    chart: {
        toolbar: { show: false },
        fontFamily: "inherit",
        animations: { enabled: false },
    },
    grid: {
        borderColor: "rgba(34,34,34,0.08)",
        strokeDashArray: 4,
    },
    legend: {
        fontSize: "12px",
        fontWeight: 500,
        labels: { colors: "#707070" },
    },
};

export function PlatformGrowthChart() {
    const options: ApexOptions = {
        ...baseChartOptions,
        chart: { ...baseChartOptions.chart, type: "area", height: 320 },
        colors: ["#6A3CA8", "#00A663"],
        stroke: { curve: "smooth", width: 2 },
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.45,
                opacityTo: 0.05,
                stops: [0, 90, 100],
            },
        },
        dataLabels: { enabled: false },
        xaxis: {
            categories: platformGrowthCategories,
            labels: { style: { colors: "#707070", fontSize: "11px" } },
        },
        yaxis: {
            labels: {
                style: { colors: "#707070", fontSize: "11px" },
                formatter: (v) => `${Math.round(v)}`,
            },
        },
        tooltip: { theme: "light" },
    };

    return (
        <div className={chartCardClass}>
            <h3 className={chartTitleClass}>Platform Growth</h3>
            <p className={chartSubtitleClass}>New users and listings over the last 12 months</p>
            <ReactApexChart options={options} series={platformGrowthSeries} type="area" height={320} />
        </div>
    );
}

export function UserDistributionChart() {
    const options: ApexOptions = {
        ...baseChartOptions,
        chart: { ...baseChartOptions.chart, type: "donut", height: 300 },
        colors: ["#6A3CA8", "#0832AE", "#00A663", "#EA3934"],
        labels: userDistributionLabels,
        plotOptions: {
            pie: {
                donut: {
                    size: "68%",
                    labels: {
                        show: true,
                        total: {
                            show: true,
                            label: "Total Users",
                            fontSize: "13px",
                            fontWeight: 600,
                            color: "#222",
                        },
                    },
                },
            },
        },
        dataLabels: { enabled: false },
        legend: { position: "bottom" },
    };

    return (
        <div className={chartCardClass}>
            <h3 className={chartTitleClass}>User Distribution</h3>
            <p className={chartSubtitleClass}>Developers, agencies, agents, and end users</p>
            <ReactApexChart options={options} series={userDistributionSeries} type="donut" height={300} />
        </div>
    );
}

export function ListingsByTypeChart() {
    const options: ApexOptions = {
        ...baseChartOptions,
        chart: { ...baseChartOptions.chart, type: "bar", height: 300 },
        colors: ["#6A3CA8"],
        plotOptions: {
            bar: {
                borderRadius: 8,
                columnWidth: "48%",
            },
        },
        dataLabels: { enabled: false },
        xaxis: {
            categories: listingsByTypeCategories,
            labels: { style: { colors: "#707070", fontSize: "11px" } },
        },
        yaxis: {
            labels: {
                style: { colors: "#707070", fontSize: "11px" },
                formatter: (v) => `${Math.round(v)}`,
            },
        },
    };

    return (
        <div className={chartCardClass}>
            <h3 className={chartTitleClass}>Listings by Type</h3>
            <p className={chartSubtitleClass}>Buy, rent, commercial, and new projects</p>
            <ReactApexChart options={options} series={listingsByTypeSeries} type="bar" height={300} />
        </div>
    );
}

export function ReportsOverviewChart() {
    const options: ApexOptions = {
        ...baseChartOptions,
        chart: { ...baseChartOptions.chart, type: "bar", height: 300, stacked: true },
        colors: ["#EA3934", "#00A663"],
        plotOptions: {
            bar: {
                borderRadius: 6,
                columnWidth: "52%",
            },
        },
        dataLabels: { enabled: false },
        xaxis: {
            categories: reportsMonthlyCategories,
            labels: { style: { colors: "#707070", fontSize: "11px" } },
        },
        yaxis: {
            labels: {
                style: { colors: "#707070", fontSize: "11px" },
            },
        },
    };

    return (
        <div className={chartCardClass}>
            <h3 className={chartTitleClass}>Reports Overview</h3>
            <p className={chartSubtitleClass}>Open vs resolved reports (last 6 months)</p>
            <ReactApexChart options={options} series={reportsMonthlySeries} type="bar" height={300} />
        </div>
    );
}

export function RevenueTrendChart() {
    const options: ApexOptions = {
        ...baseChartOptions,
        chart: { ...baseChartOptions.chart, type: "line", height: 280 },
        colors: ["#0832AE"],
        stroke: { curve: "smooth", width: 3 },
        markers: {
            size: 4,
            strokeWidth: 2,
            hover: { size: 6 },
        },
        dataLabels: { enabled: false },
        xaxis: {
            categories: platformGrowthCategories,
            labels: { style: { colors: "#707070", fontSize: "11px" } },
        },
        yaxis: {
            labels: {
                style: { colors: "#707070", fontSize: "11px" },
                formatter: (v) => `${v}K`,
            },
        },
    };

    return (
        <div className={chartCardClass}>
            <h3 className={chartTitleClass}>Revenue Trend</h3>
            <p className={chartSubtitleClass}>Monthly platform revenue (AED thousands)</p>
            <ReactApexChart options={options} series={revenueTrendSeries} type="line" height={280} />
        </div>
    );
}

export function CmsActivityChart() {
    const options: ApexOptions = {
        ...baseChartOptions,
        chart: { ...baseChartOptions.chart, type: "radialBar", height: 280 },
        colors: ["#6A3CA8", "#0832AE", "#00A663", "#EA3934"],
        labels: cmsActivityLabels,
        plotOptions: {
            radialBar: {
                dataLabels: {
                    name: { fontSize: "12px" },
                    value: { fontSize: "14px", fontWeight: 600 },
                    total: {
                        show: true,
                        label: "CMS Items",
                        formatter: () => `${cmsActivitySeries.reduce((a, b) => a + b, 0)}`,
                    },
                },
            },
        },
        legend: { show: true, position: "bottom" },
    };

    return (
        <div className={chartCardClass}>
            <h3 className={chartTitleClass}>CMS Activity</h3>
            <p className={chartSubtitleClass}>Published content by module</p>
            <ReactApexChart options={options} series={cmsActivitySeries} type="radialBar" height={280} />
        </div>
    );
}
