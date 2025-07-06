import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FiFolderPlus } from "react-icons/fi";
import Sidebar from "../components/common/Sidebar";
import Header from "../components/common/Header";
import FilterSortSearch from "../components/common/FilterSortSearch";
import AnketListele from "./SurveyList";
import CreateSurveyOrGroupModal from "../components/modals/CreateSurveyOrGroupModal";

export default function Anketler({
    createSurvey,
    fetchsurveychamberById,
    fetchallsurvey,
    handleLogout,
    deletesurvey,
    deletesurveyshareById,
    allanswerdelete,
    user,
    chamberName
}) {
    const [chamber, setChamber] = useState(null);
    const [userId, setUserId] = useState(null);
    const [username, setUsername] = useState("");
    const [refreshKey, setRefreshKey] = useState(0);
    const [allSurveys, setAllSurveys] = useState([]);
    const [groupedSurveysData, setGroupedSurveysData] = useState({});
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchMode, setSearchMode] = useState("title");
    const [sortBy, setSortBy] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");
    const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("survey"); // "survey" veya "group"
    useEffect(() => {
        if (user) {
            setChamber(user.chamber);
            setUserId(user.id);
            setUsername(user.name);
        }
    }, [user]);

    // Anketleri yükle ve gruplandır
    useEffect(() => {
        if (!chamber && !userId) return;
        const loadSurveys = async () => {
            try {
                let data;
                if (user?.role === 'superAdmin') {
                    data = await fetchallsurvey();
                } else if (user?.role === 'admin') {
                    data = await fetchsurveychamberById(chamber);
                }
                setAllSurveys(data);

                const grouped = data.reduce((acc, survey) => {
                    const groupName = survey.group?.trim() || "Geçersiz Klasör Adı";
                    if (!acc[groupName]) acc[groupName] = [];
                    acc[groupName].push(survey);
                    return acc;
                }, {});
                setGroupedSurveysData(grouped);

                const validGroups = Object.keys(grouped).filter(
                    (name) => name !== "Geçersiz Klasör Adı"
                );
                if (!selectedGroup || !validGroups.includes(selectedGroup)) {
                    setSelectedGroup(validGroups.length > 0 ? validGroups[0] : null);
                }
            } catch (error) {
                setAllSurveys([]);
                setGroupedSurveysData({});
                setSelectedGroup(null);
            }
        };
        loadSurveys();
    }, [chamber, refreshKey, userId]);

    // Filtreleme ve sıralama işlemleri
    const visibleSurveys = allSurveys
        .filter((s) => s.group === selectedGroup)
        .filter((s) => {
            if (!searchTerm) return true;

            if (searchMode === "title") {
                return s.title.toLowerCase().includes(searchTerm);
            } else {
                return s.tags && s.tags.some((tag) => tag.toLowerCase().includes(searchTerm));
            }
        })
        .filter((s) => {
            if (sortBy === "createTime" && (dateRange.startDate || dateRange.endDate)) {
                const created = new Date(s.createdAt).getTime();
                const start = dateRange.startDate ? new Date(dateRange.startDate).getTime() : null;
                let end = null;
                if (dateRange.endDate) {
                    const endDate = new Date(dateRange.endDate);
                    endDate.setDate(endDate.getDate() + 1);
                    end = endDate.getTime();
                }
                if (start && end) {
                    return created >= start && created < end;
                } else if (start) {
                    return created >= start;
                } else if (end) {
                    return created < end;
                }
                return true;
            }
            return true;
        })
        .sort((a, b) => {
            if (!sortBy) return 0;

            let compareResult = 0;
            if (sortBy === "title") {
                compareResult = a.title.localeCompare(b.title);
            } else if (sortBy === "tags") {
                const extractFirstNumber = (tags) => {
                    for (const tag of tags || []) {
                        const match = tag.match(/\d+/);
                        if (match) return parseInt(match[0], 10);
                    }
                    return null;
                };
                const numA = extractFirstNumber(a.tags);
                const numB = extractFirstNumber(b.tags);

                if (numA !== null && numB !== null) {
                    compareResult = numA - numB;
                } else if (numA !== null) {
                    compareResult = -1;
                } else if (numB !== null) {
                    compareResult = 1;
                } else {
                    const lenA = a.tags ? a.tags.length : 0;
                    const lenB = b.tags ? b.tags.length : 0;
                    compareResult = lenA - lenB;
                }
            } else if (sortBy === "createTime") {
                compareResult = new Date(a.createdAt) - new Date(b.createdAt);
            }
            return sortOrder === "asc" ? compareResult : -compareResult;
        });


    const handleCreateSurveyInGroup = async ({ title, description, surveyType }) => {
        if (!selectedGroup) {
            toast.error("Lütfen bir klasör seçin veya yeni bir klasör oluşturun.");
            return;
        }
        if (!title.trim()) {
            toast.error("Anket başlığı boş bırakılamaz.");
            return;
        }

        try {
            const surveyData = {
                title: title.trim(),
                chamber: chamber,
                userId: userId,
                description: description.trim(),
                group: selectedGroup,
                surveyType: surveyType,
            };

            const createdSurvey = await createSurvey(surveyData);
            if (createdSurvey) {
                toast.success("Anket Oluşturuldu: " + title);
                setRefreshKey((prev) => prev + 1);
            }
        } catch (error) {
            console.error("Anket oluşturulurken hata:", error);
        }
    };

    // CreateNewGroupModal’dan gelen data ile yeni grup + anket oluştur
    const handleCreateNewGroupAndSurvey = async ({ newGroupName, title, description, surveyType }) => {
        if (!newGroupName.trim()) {
            toast.error("Klasör adı boş bırakılamaz.");
            return;
        }
        if (!title.trim()) {
            toast.error("Anket başlığı boş bırakılamaz.");
            return;
        }

        try {
            const surveyData = {
                title: title.trim(),
                description: description.trim(),
                chamber: chamber,
                userId: userId,
                group: newGroupName.trim(),
                surveyType: surveyType,
            };

            const createdSurvey = await createSurvey(surveyData);
            if (createdSurvey) {
                toast.success(`Yeni klasör "${newGroupName}" ve anket "${title}" oluşturuldu.`);
                setRefreshKey((prev) => prev + 1);
                setSelectedGroup(newGroupName.trim());
            }
        } catch (error) {
            console.error("Yeni klasör ve anket oluşturulurken hata:", error);
        }
    };

    const openCreateSurveyModal = () => {
        const validGroupNames = Object.keys(groupedSurveysData).filter(
            (name) => name !== "Geçersiz Grup Adı"
        );
        if (validGroupNames.length === 0) {
            toast.error("Önce bir klasör oluşturmanız gerekiyor!");
            openCreateNewGroupModal();
            return;
        }
        setModalMode("survey");
        setIsModalOpen(true);
    };

    const openCreateNewGroupModal = () => {
        setModalMode("group");
        setIsModalOpen(true);
    };

    return (
        <div className="flex flex-col md:flex-row h-screen bg-gradient-to-br from-primary-light to-secondary-light font-sans">
            <Sidebar
                className="hidden md:flex md:flex-shrink-0"
                groupedSurveysData={groupedSurveysData}
                selectedGroup={selectedGroup}
                setSelectedGroup={setSelectedGroup}
                username={username}
                handleLogout={handleLogout}
                openCreateSurveyModal={openCreateSurveyModal}
                openCreateNewGroupModal={openCreateNewGroupModal}
                sidebar={sidebarOpen}
            />

            <div className="flex-1 flex flex-col bg-neutral-light min-h-screen">
                <Header
                    selectedGroup={selectedGroup}
                    chamberName={chamberName}
                    Sidebar={(sidebar) => {
                        setSidebarOpen(sidebar);
                    }}
                />

                <main className="flex-1 p-4 md:p-8 bg-neutral-light overflow-y-auto">
                    <FilterSortSearch
                        onSearch={(t) => setSearchTerm(t.toLowerCase())}
                        onSort={setSortBy}
                        searchMode={searchMode}
                        setSearchMode={setSearchMode}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                        sortOrder={sortOrder}
                        setSortOrder={setSortOrder}
                        dateRange={dateRange}
                        setDateRange={setDateRange}
                    />
                    <hr className="mb-5 border-none h-[1px] rounded-xl bg-neutral-darkest" />

                    {selectedGroup ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                            <AnketListele
                                visibleSurveys={visibleSurveys}
                                setRefreshKey={setRefreshKey}
                                deletesurvey={deletesurvey}
                                deletesurveyshareById={deletesurveyshareById}
                                allanswerdelete={allanswerdelete}
                            />
                        </div>
                    ) : (
                        <div className="col-span-full text-center py-12 bg-neutral-white rounded-lg shadow-md border border-neutral-DEFAULT mx-4 md:mx-0">
                            <h3 className="text-xl md:text-2xl font-bold text-neutral-darkest mb-4">
                                Hoş Geldiniz!
                            </h3>
                            <p className="text-neutral-dark text-base md:text-lg">
                                Başlamak için yeni bir klasör oluşturun.
                            </p>
                            <button
                                className="btn bg-primary text-primary-text px-5 py-2 rounded-lg shadow-md hover:bg-primary-dark transition-colors duration-200 mt-6 text-base md:text-lg"
                                onClick={openCreateNewGroupModal}
                            >
                                <div className="flex items-center justify-center">
                                    <FiFolderPlus className="h-5 w-5 mr-2" />
                                    Yeni Klasör Oluştur
                                </div>
                            </button>
                        </div>
                    )}
                </main>
            </div>

            <CreateSurveyOrGroupModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                mode={modalMode}
                selectedGroup={selectedGroup}
                onCreate={modalMode === "group" ? handleCreateNewGroupAndSurvey : handleCreateSurveyInGroup}
            />
        </div>
    );
}

