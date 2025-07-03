import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Sidebar from "../components/common/Sidebar";
import Header from "../components/common/Header";
import FilterSortSearch from "../components/common/FilterSortSearch";
import AnketListele from "./SurveyList";
import CreateSurveyModal from "../components/modals/CreateSurveyModal";
import CreateNewGroupModal from "../components/modals/CreateNewGroupModal";
import { FiFolderPlus } from 'react-icons/fi';

export default function Anketler({ createSurvey, fetchsurveychamberById, handleLogout, deletesurvey, deletesurveyshareById, allanswerdelete, user }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [newGroupName, setNewGroupName] = useState("");
    const [currentStep, setCurrentStep] = useState(1);
    const [chamber, setChamber] = useState();
    const [userId, setuserId] = useState();

    const [refreshKey, setRefreshKey] = useState(0);
    const [username, setusername] = useState('');
    const [allSurveys, setAllSurveys] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [groupedSurveysData, setGroupedSurveysData] = useState({});

    const [searchTerm, setSearchTerm] = useState('');
    const [searchMode, setSearchMode] = useState('title');

    useEffect(() => {
        if (!user) return;
        setChamber(user.chamber)
        setuserId(user.id)
        setusername(user.name)
    }, [user])

    // Search, sort, filter handlers
    const handleSearch = (text) => setSearchTerm(text.toLowerCase());
    const handleSort = (field) => {
        setSortBy(field);
    };

    const [sortBy, setSortBy] = useState(null); // 'title', 'tags', 'createTime' veya null
    const [sortOrder, setSortOrder] = useState('asc'); // 'asc' veya 'desc'
    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });


    // Filtrelenmiş ve sıralanmış anketler
    const visibleSurveys = allSurveys
        .filter(s => s.group === selectedGroup)
        .filter(s => {
            if (!searchTerm) return true;

            if (searchMode === 'title') {
                return s.title.toLowerCase().includes(searchTerm);
            } else {
                return s.tags && s.tags.some(tag => tag.toLowerCase().includes(searchTerm));
            }
        })
        .filter(s => {
            if (sortBy === 'createTime' && (dateRange.startDate || dateRange.endDate)) {
                const created = new Date(s.createdAt).getTime();
                const start = dateRange.startDate ? new Date(dateRange.startDate).getTime() : null;
                let end = null;
                if (dateRange.endDate) {
                    const endDate = new Date(dateRange.endDate);
                    endDate.setDate(endDate.getDate() + 1); // bitiş tarihine 1 gün ekle
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

            if (sortBy === 'title') {
                compareResult = a.title.localeCompare(b.title);
            } else if (sortBy === 'tags') {
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
                    compareResult = -1; // numaralı olan önce gelsin
                } else if (numB !== null) {
                    compareResult = 1;  // numaralı olan önce gelsin
                } else {
                    // Hiçbiri numara içermiyorsa etiket sayısına göre karşılaştır
                    const lenA = a.tags ? a.tags.length : 0;
                    const lenB = b.tags ? b.tags.length : 0;
                    compareResult = lenA - lenB;
                }
            } else if (sortBy === 'createTime') {
                compareResult = new Date(a.createdAt) - new Date(b.createdAt);
            }

            return sortOrder === 'asc' ? compareResult : -compareResult;
        });


    useEffect(() => {
        if (!chamber, !userId) return; // Eğer chamber yoksa yükleme yapma

        const loadSurveys = async () => {
            try {
                const data = await fetchsurveychamberById(chamber);
                setAllSurveys(data);

                const grouped = data.reduce((acc, survey) => {
                    const groupName = survey.group?.trim() || "Geçersiz Klasör Adı";
                    if (!acc[groupName]) acc[groupName] = [];
                    acc[groupName].push(survey);
                    return acc;
                }, {});
                setGroupedSurveysData(grouped);

                const validGroups = Object.keys(grouped).filter(name => name !== "Geçersiz Klasör Adı");
                if (!selectedGroup || !validGroups.includes(selectedGroup)) {
                    setSelectedGroup(validGroups.length > 0 ? validGroups[0] : null);
                }
            } catch {
                setAllSurveys([]);
                setGroupedSurveysData({});
                setSelectedGroup(null);
            }
        };

        loadSurveys();
    }, [chamber, refreshKey, userId]); // sadece chamber geldikten sonra çalışır


    // Anket oluşturma işlemi (mevcut grup altında)
    const handleCreateSurveyInGroup = async () => {
        if (!selectedGroup) {
            toast("Lütfen bir klasör seçin veya yeni bir klasör oluşturun.");
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
                chamber,
                userId,
                group: selectedGroup
            };

            const createdSurvey = await createSurvey(surveyData);
            if (createdSurvey) {
                toast.success("Anket Oluşturuldu: " + title);
                setRefreshKey(prev => prev + 1);
                setTitle("");
                setDescription("");
                setCurrentStep(1);
                setIsSurveyModalOpen(false);
            }
        } catch (error) {
            console.error("Anket oluşturulurken hata:", error);
        }
    };

    // Yeni grup oluşturup anket oluşturma
    const handleCreateNewGroupAndSurvey = async () => {
        if (!newGroupName.trim()) {
            toast.error(`Klasör adı boş bırakılamaz.`);
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
                chamber,
                userId,
                group: newGroupName.trim()
            };

            const createdSurvey = await createSurvey(surveyData);
            if (createdSurvey) {
                toast.success(`Yeni klasör "${newGroupName}" ve anket "${title}" oluşturuldu.`);
                setRefreshKey(prev => prev + 1);
                setTitle("");
                setDescription("");
                setNewGroupName("");
                setCurrentStep(1);
                setSelectedGroup(newGroupName.trim());
                setIsGroupModalOpen(false);
            }
        } catch (error) {
            console.error("Yeni klasör ve anket oluşturulurken hata:", error);
        }
    };


    const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
    const [isSurveyModalOpen, setIsSurveyModalOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    // Modal açma fonksiyonları
    const openCreateSurveyModal = () => {
        const validGroupNames = Object.keys(groupedSurveysData).filter(name => name !== "Geçersiz Grup Adı");
        if (validGroupNames.length === 0) {
            toast.warn("Önce bir klasör oluşturmanız gerekiyor!");
            openCreateNewGroupModal();
            return;
        }
        setTitle("");
        setDescription("");
        setCurrentStep(1);
        setIsSurveyModalOpen(true);
    };


    const openCreateNewGroupModal = () => {
        setTitle("");
        setDescription("");
        setNewGroupName("");
        setCurrentStep(1);
        setIsGroupModalOpen(true);
    };

    return (
        <div className="flex flex-col md:flex-row h-screen bg-gradient-to-br from-primary-light to-secondary-light font-sans">
            {/* Sidebar: Mobilde gizli, tablet+ göster */}
            
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
                <Header selectedGroup={selectedGroup} chamber={chamber} UserId={userId} Sidebar={(sidebar) => { setSidebarOpen(sidebar) }} />

                <main className="flex-1 p-4 md:p-8 bg-neutral-light overflow-y-auto">
                    <FilterSortSearch
                        onSearch={handleSearch}
                        onSort={handleSort}
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

            {/* Modallar aynen kalabilir */}
            <CreateSurveyModal
                isOpen={isSurveyModalOpen}
                onClose={() => setIsSurveyModalOpen(false)}
                title={title}
                setTitle={setTitle}
                description={description}
                setDescription={setDescription}
                selectedGroup={selectedGroup}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                handleCreateSurveyInGroup={handleCreateSurveyInGroup}
            />

            <CreateNewGroupModal
                isOpen={isGroupModalOpen}
                onClose={() => setIsGroupModalOpen(false)}
                title={title}
                setTitle={setTitle}
                description={description}
                setDescription={setDescription}
                newGroupName={newGroupName}
                setNewGroupName={setNewGroupName}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                handleCreateNewGroupAndSurvey={handleCreateNewGroupAndSurvey}
            />
        </div>
    );
}
