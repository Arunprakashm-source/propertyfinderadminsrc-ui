import Header from "../../components/Header/Header";

const dashboardCards = [
    {
        title: "Total Users",
        count: "12,450",
        growth: "+12%",
        cardBg: "bg-[#FFF9D2]",
    },
    {
        title: "Total Revenue",
        count: "$48,900",
        growth: "+8%",
        cardBg: "bg-[#EEEEEE]",
    },
    {
        title: "Total Projects",
        count: "320",
        growth: "+5%",
        cardBg: "bg-[#BFDDF0]",
    },
    {
        title: "Pending Requests",
        count: "28",
        growth: "-2%",
        cardBg: "bg-[#EAE6BC]",
    },
];
function Dashboard() {
    return (
        <div className="px-4 pb-6 pt-4 sm:px-6 lg:px-8">
            {/* Content */}
            <Header title="Dashboard" showBack={false} onBackClick={() => { }} />
            <div className="bg-[#fff] mt-[30px] rounded-[12px]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[12px]">
                    {dashboardCards.map((card, index) => (
                        <div
                            key={index}
                            className={`${card.cardBg} rounded-[12px] p-[15px]`}
                        >
                            <h3 className="text-[16px] font-[SemiBold] text-[#666]">
                                {card.title}
                            </h3>

                            <div className="flex items-center justify-between mt-3">
                                <h2 className="text-[28px] font-[Bold] text-[#222]">
                                    {card.count}
                                </h2>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}

export default Dashboard;

