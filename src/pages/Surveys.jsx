import React, { useEffect, useState } from "react";
import Sidebar from "../components/common/Sidebar";
import Header from "../components/common/Header";
import FilterSortSearch from "../components/common/FilterSortSearch";
import AnketListele from "./SurveyList";
import CreateSurveyOrGroupModal from "../components/modals/CreateSurveyOrGroupModal";
import TemplateSurveyModal from "../components/modals/TemplateSurveyModal";
import EmptyState from "./surveys/components/EmptyState";
import useSurveys from "./surveys/hooks/useSurveys";
import { filterAndSortSurveys } from "./surveys/utils/surveyFilters";
import useSurveyActions from "./surveys/hooks/useSurveyActions";

export default function Surveys({
  createSurvey,
  deletesurvey,
  deletesurveyshareById,
  allanswerdelete,
  handleLogout,
  user,
  chamberName,
  fetchallsurvey,
  fetchsurveychamberById,
  updatesurveyfeature,
  createsurveytemplate,
  getallsurveytemplate,
  deletesurveytemplateId,
  getChamberId,
}) {
  const [username, setUsername] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("survey");
  const [isFixModalOpen, setIsFixModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchMode, setSearchMode] = useState("title");
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [active, setActive] = useState(null);
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  const [templateData, setTemplateData] = useState(null);

  const {
    allSurveys,
    groupedSurveysData,
    selectedGroup,
    setSelectedGroup,
    setRefreshKey,
  } = useSurveys({ user, fetchallsurvey, fetchsurveychamberById });

  const {
    createSurveyInGroup,
    createNewGroupAndSurvey,
    createSurveyFromTemplate,
  } = useSurveyActions({
    createSurvey,
    chamber: user?.chamber,
    userId: user?.id,
    setRefreshKey,
    setSelectedGroup,
  });

  useEffect(() => {
    if (user) setUsername(user.name);
  }, [user]);

  const visibleSurveys = filterAndSortSurveys(
    allSurveys,
    selectedGroup,
    searchTerm.toLowerCase(),
    searchMode,
    sortBy,
    sortOrder,
    active,
    dateRange,
  );

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gradient-to-br from-primary-light to-secondary-light font-sans">
      <Sidebar
        groupedSurveysData={groupedSurveysData}
        selectedGroup={selectedGroup}
        setSelectedGroup={setSelectedGroup}
        username={username}
        handleLogout={handleLogout}
        openCreateSurveyModal={() => {
          setModalMode("survey");
          setIsModalOpen(true);
        }}
        openCreateNewGroupModal={() => {
          setModalMode("group");
          setIsModalOpen(true);
        }}
        fixsurvey={() => setIsFixModalOpen(true)}
        sidebar={sidebarOpen}
        user={user}
      />
      <div className="flex-1 flex flex-col bg-neutral-light min-h-screen">
        <Header
          selectedGroup={selectedGroup}
          chamberName={chamberName}
          Sidebar={setSidebarOpen}
        />
        <main className="flex-1 p-4 md:p-8 bg-neutral-light overflow-y-auto">
          <FilterSortSearch
            onSearch={(t) => setSearchTerm(t)}
            searchMode={searchMode}
            setSearchMode={setSearchMode}
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            dateRange={dateRange}
            setDateRange={setDateRange}
            active={active}
            setActive={setActive}
          />
          <hr className="mb-5 border-none h-[1px] rounded-xl bg-neutral-darkest" />
          {selectedGroup ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              <AnketListele
                allSurveys={allSurveys}
                visibleSurveys={visibleSurveys}
                setRefreshKey={setRefreshKey}
                deletesurvey={deletesurvey}
                deletesurveyshareById={deletesurveyshareById}
                allanswerdelete={allanswerdelete}
                createSurvey={createSurvey}
                updatesurveyfeature={updatesurveyfeature}
                user={user}
                createTemplate={setTemplateData}
              />
            </div>
          ) : (
            <EmptyState onCreate={() => setIsModalOpen(true)} />
          )}
        </main>
      </div>

      <CreateSurveyOrGroupModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        selectedGroup={selectedGroup}
        onCreate={
          isModalOpen && modalMode === "group"
            ? createNewGroupAndSurvey
            : (data) => createSurveyInGroup({ ...data, selectedGroup })
        }
      />
      <TemplateSurveyModal
        getallsurveytemplate={getallsurveytemplate}
        deletesurveytemplateId={deletesurveytemplateId}
        isOpen={isFixModalOpen}
        onClose={() => setIsFixModalOpen(false)}
        onSelectTemplate={(data) =>
          createSurveyFromTemplate(data, selectedGroup)
        }
        user={user}
        templateData={templateData}
        createsurveytemplate={createsurveytemplate}
        animateisOpen={setIsFixModalOpen}
        getChamberId={getChamberId}
      />
    </div>
  );
}
