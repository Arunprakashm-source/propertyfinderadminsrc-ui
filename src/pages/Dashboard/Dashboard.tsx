import Header from "../../components/Header/Header";
import {
    MultiUserIcon,
    ListingIcon,
    TotalProjectIcon,
    NotificationIcon,
} from "../../assets/icons";
import { dashboardStatCards } from "./dashboardData";
import {
    CmsActivityChart,
    ListingsByTypeChart,
    PlatformGrowthChart,
    ReportsOverviewChart,
    RevenueTrendChart,
    UserDistributionChart,
} from "./DashboardCharts";

const statIcons = [MultiUserIcon, ListingIcon, TotalProjectIcon, NotificationIcon];

function Dashboard() {
    return (
        <div className="px-4 pb-6 pt-4 sm:px-6 lg:px-8">
            <Header title="Dashboard" showBack={false} onBackClick={() => { }} />

            <div className="mt-[20px] space-y-[20px]">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-[14px]">
                    {dashboardStatCards.map((card, index) => {
                        const Icon = statIcons[index];
                        return (
                            <div
                                key={card.title}
                                className={`${card.cardBg} rounded-[12px] p-[18px] border border-[rgba(34,34,34,0.06)]`}
                            >
                                <div className="flex items-start justify-between gap-[10px]">
                                    <div>
                                        <p className="text-[13px] font-[Medium] text-[#666]">{card.title}</p>
                                        <h2 className="text-[28px] font-[Bold] text-[#222] mt-[8px] leading-none">
                                            {card.value}
                                        </h2>
                                    </div>
                                    <span
                                        className={`flex h-[42px] w-[42px] items-center justify-center rounded-[10px] ${card.iconBg}`}
                                    >
                                        <Icon stroke="#fff" fill="#fff" width={20} height={20} className="shrink-0" />
                                    </span>
                                </div>
                                <div className="mt-[14px] flex items-center gap-[6px]">
                                    <span
                                        className={`text-[12px] font-[SemiBold] px-[8px] py-[3px] rounded-[6px] ${
                                            card.growthUp
                                                ? "bg-[#00A663] text-white"
                                                : "bg-[#EA3934] text-white"
                                        }`}
                                    >
                                        {card.growth}
                                    </span>
                                    <span className="text-[12px] text-[#707070] font-[Regular]">vs last month</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] gap-[14px]">
                    <PlatformGrowthChart />
                    <UserDistributionChart />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-[14px]">
                    <ListingsByTypeChart />
                    <ReportsOverviewChart />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-[14px]">
                    <RevenueTrendChart />
                    <CmsActivityChart />
                </div>

                <div className="bg-white rounded-[12px] border border-[#EAEAEA] p-[20px]">
                    <h3 className="text-[16px] font-[Bold] text-[#222] mb-[12px]">Ecosystem Overview</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-[12px]">
                        <div className="rounded-[10px] bg-[#F5F5F5] p-[14px]">
                            <p className="text-[12px] text-[#707070]">propertyfinderclone-sultan</p>
                            <p className="text-[14px] font-[SemiBold] text-[#222] mt-[4px]">User portal (buy/rent/search)</p>
                        </div>
                        <div className="rounded-[10px] bg-[#F5F5F5] p-[14px]">
                            <p className="text-[12px] text-[#707070]">pfexperts</p>
                            <p className="text-[14px] font-[SemiBold] text-[#222] mt-[4px]">Developer / Agency / Agent portal</p>
                        </div>
                        <div className="rounded-[10px] bg-[#F3EEFF] p-[14px] border border-[#DFD3EB]">
                            <p className="text-[12px] text-[#6A3CA8]">propertyfinderadminsrc-ui</p>
                            <p className="text-[14px] font-[SemiBold] text-[#222] mt-[4px]">Central admin control panel</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
