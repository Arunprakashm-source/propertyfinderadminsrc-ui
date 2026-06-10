import { useCallback, useEffect, useMemo, useState } from "react";
import "quill/dist/quill.snow.css";
import Header from "../../../components/Header/Header";
import Loader from "../../../components/Loader/loader";
import { useToast } from "../../../context/ToastContext";
import { getApiErrorMessage } from "../../../services/apiClient";
import { legalService } from "../../../services/legalService";
import type { CountryRecord, LegalDocumentRecord, LegalPageSettings } from "../../../types/api";
import {
  Dropdown,
  SaveBar,
  TextField,
  sectionClass,
  sectionTitleClass,
} from "../shared/CmsFormShared";
import { LegalCategorySection } from "./LegalCategorySection";

const emptySettings: LegalPageSettings = {
  termsPageTitle: "Terms and conditions",
  breadcrumbHomeLabel: "Home",
  defaultCountryCode: "AE",
  contactBlock: {
    supportEmail: "support@propertyfinder.ae",
    sectionTitle: "Contact us",
  },
};

function LegalPagesSettings() {
  const { push } = useToast();
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<LegalPageSettings>(emptySettings);
  const [countries, setCountries] = useState<CountryRecord[]>([]);
  const [documents, setDocuments] = useState<LegalDocumentRecord[]>([]);
  const [filterCountry, setFilterCountry] = useState("AE");
  const [refreshKey, setRefreshKey] = useState(0);

  const countryOptions = useMemo(
    () =>
      countries
        .map((c) => ({
          value: c.code || "",
          label: c.name || c.code || "",
        }))
        .filter((c) => c.value),
    [countries]
  );

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await legalService.getLegal({ countryCode: filterCountry });
      setSettings({ ...emptySettings, ...data.settings });
      setCountries(data.countries ?? []);
      setDocuments(data.documents ?? []);
    } catch (error) {
      push({
        type: "error",
        title: "Failed to load legal pages",
        description: getApiErrorMessage(error, "Unable to fetch legal CMS data."),
      });
    } finally {
      setLoading(false);
    }
  }, [filterCountry, push]);

  useEffect(() => {
    void fetchData();
  }, [fetchData, refreshKey]);

  const updateSettings = <K extends keyof LegalPageSettings>(
    key: K,
    value: LegalPageSettings[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const updateContact = (key: "supportEmail" | "sectionTitle", value: string) => {
    setSettings((prev) => ({
      ...prev,
      contactBlock: { ...prev.contactBlock, [key]: value },
    }));
  };

  const handleSaveSettings = async () => {
    try {
      await legalService.saveSettings(settings);
      push({
        type: "success",
        title: "Settings saved",
        description: "Legal page settings updated successfully.",
      });
    } catch (error) {
      push({
        type: "error",
        title: "Save failed",
        description: getApiErrorMessage(error, "Could not save legal settings."),
      });
    }
  };

  if (loading) {
    return (
      <div className="px-4 pb-6 pt-4 sm:px-6 lg:px-8 flex justify-center py-[80px]">
        <Loader size={80} />
      </div>
    );
  }

  return (
    <div className="px-4 pb-6 pt-4 sm:px-6 lg:px-8">
      <Header title="Legal Pages" showBack={false} onBackClick={() => {}} />

      <div className="mt-[20px]">
        <div className={sectionClass}>
          <h3 className={sectionTitleClass}>Page Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
            <TextField
              label="Terms Page Title"
              value={settings.termsPageTitle || ""}
              onChange={(v) => updateSettings("termsPageTitle", v)}
            />
            <Dropdown
              label="Default Country"
              value={settings.defaultCountryCode || "AE"}
              options={countryOptions.length ? countryOptions : [{ value: "AE", label: "UAE" }]}
              onChange={(v) => updateSettings("defaultCountryCode", v)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] mt-[16px]">
            <TextField
              label="Support Email"
              value={settings.contactBlock?.supportEmail || ""}
              onChange={(v) => updateContact("supportEmail", v)}
            />
            <TextField
              label="Contact Section Title"
              value={settings.contactBlock?.sectionTitle || ""}
              onChange={(v) => updateContact("sectionTitle", v)}
            />
          </div>
          <SaveBar onSave={() => void handleSaveSettings()} />
        </div>

        <div className={sectionClass}>
          <h3 className={sectionTitleClass}>Categories by Location</h3>
          <p className="text-[13px] text-[#707070] mb-[16px]">
            Select a location, add categories (e.g. Terms of use, Privacy policy), and enter content
            for each. Empty categories are hidden on the public site.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] mb-[8px]">
            <Dropdown
              label="Location (Country)"
              value={filterCountry}
              options={countryOptions.length ? countryOptions : [{ value: "AE", label: "UAE" }]}
              onChange={setFilterCountry}
            />
          </div>

          <LegalCategorySection
            countryCode={filterCountry}
            documents={documents}
            onSaved={() => setRefreshKey((k) => k + 1)}
          />
        </div>
      </div>
    </div>
  );
}

export default LegalPagesSettings;
