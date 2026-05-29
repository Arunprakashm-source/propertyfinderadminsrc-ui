import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Login from "./pages/AccountSection/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import MainIndex from "./pages/MainIndex";
import UserAccount from "./pages/UserManagement/User/UserAccount";
import UserAccountDetail from "./pages/UserManagement/User/UserAccountDetail";
import AgencyAccount from "./pages/UserManagement/Agency/AgencyAccount";
import AgencyAccountDetail from "./pages/UserManagement/Agency/AgencyAccountDetail";
import AgencyAccView from "./pages/UserManagement/Agency/AgencyAccView";
import DeveloperAccount from "./pages/UserManagement/Developer/DeveloperAccount";
import DeveloperAccDetail from "./pages/UserManagement/Developer/DeveloperAccDetails";
import AgentAccount from "./pages/UserManagement/Agent/AgentAccount";
import AgentAccountDetail from "./pages/UserManagement/Agent/AgentAccountDetails";
import ListingProperty from "./pages/ListingManagement/ListingProperty/ListingProperty";
import ListingPropertyDetail from "./pages/ListingManagement/ListingProperty/ListingPropertyDetail";
import ListingProject from "./pages/ListingManagement/ListingProject/ListingProject";
import ListingProjectDetail from "./pages/ListingManagement/ListingProject/ListingProjectDetail";
import ListingAmenities from "./pages/ListingManagement/ListingAmenities/ListingAmenities";
import ListingAmenitiesDetail from "./pages/ListingManagement/ListingAmenities/ListingAmenitiesDetail";
import DeveloperAccView from "./pages/UserManagement/Developer/DeveloperAccView";
import ReportManagement from "./pages/ReportManagement/ReportManagement";
import ReportManagementDetail from "./pages/ReportManagement/ReportManagementDetail";
import AboutUsSettings from "./pages/CMSManagement/AboutUs/AboutUsSettings";
import TeamManagement from "./pages/CMSManagement/Team/TeamManagement";
import TeamMemberDetail from "./pages/CMSManagement/Team/TeamMemberDetail";
import ContactUsSettings from "./pages/CMSManagement/ContactUs/ContactUsSettings";
import SitemapSettings from "./pages/CMSManagement/Sitemap/SitemapSettings";
import LegalPagesSettings from "./pages/CMSManagement/Legal/LegalPagesSettings";
import BlogManagement from "./pages/CMSManagement/Blog/BlogManagement";
import BlogDetailSettings from "./pages/CMSManagement/Blog/BlogDetailSettings";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {

  return (
    <>
      <div className="whole_app">
        <BrowserRouter basename="/admin">
          <Routes>
            <Route element={<ProtectedRoute><MainIndex /></ProtectedRoute>}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/useraccount" element={<UserAccount />} />
              <Route path="/useraccountdetail" element={<UserAccountDetail />} />
              <Route path="/developeraccount" element={<DeveloperAccount />} />
              <Route path="/developeraccountview" element={<DeveloperAccView />} />
              <Route path="/developeraccountdetail" element={<DeveloperAccDetail />} />
              <Route path="/agencyaccount" element={<AgencyAccount />} />
              <Route path="/agencyaccountview" element={<AgencyAccView />} />
              <Route path="/agencyaccountdetail" element={<AgencyAccountDetail />} />
              <Route path="/agentaccount" element={<AgentAccount />} />
              <Route path="/agentaccountdetail" element={<AgentAccountDetail />} />
              <Route path="/listingproperty" element={<ListingProperty />} />
              <Route path="/listingpropertydetail" element={<ListingPropertyDetail />} />
              <Route path="/listingproject" element={<ListingProject />} />
              <Route path="/listingprojectdetail" element={<ListingProjectDetail />} />
              <Route path="/listingamenities" element={<ListingAmenities />} />
              <Route path="/listingamenitiesdetail" element={<ListingAmenitiesDetail />} />
              <Route path="/reportsmanagement" element={<ReportManagement />} />
              <Route path="/reportsmanagementdetail" element={<ReportManagementDetail />} />
              <Route path="/cmsaboutus" element={<AboutUsSettings />} />
              <Route path="/cmsteam" element={<TeamManagement />} />
              <Route path="/cmsteamdetail" element={<TeamMemberDetail />} />
              <Route path="/cmscontactus" element={<ContactUsSettings />} />
              <Route path="/cmssitemap" element={<SitemapSettings />} />
              <Route path="/cmslegal" element={<LegalPagesSettings />} />
              <Route path="/cmsblogs" element={<BlogManagement />} />
              <Route path="/cmsblogdetail" element={<BlogDetailSettings />} />
            </Route>
            <Route path="/" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
