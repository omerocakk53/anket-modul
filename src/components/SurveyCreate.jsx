// components/AnketOlusturucu.jsx
import React, { useEffect, useState } from 'react';
import {
    DndContext,
    closestCenter,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors
} from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { LuTableOfContents } from "react-icons/lu";
import { MdOutlineWavingHand } from "react-icons/md";
import { RxEnter } from "react-icons/rx";
import Component from './Component';
import ComponentViewItems from '../Items/ComponentViewItems';
import ShortTextController from '../Controller/ShortTextController';
import LongTextController from '../Controller/LongTextController';
import WelcomeTextController from '../Controller/WelcomeTextController';
import FinishTextController from '../Controller/FinishTextController';
import MultipleChoiceController from '../Controller/MultipleChoiceController';
import DropdownController from '../Controller/DropdownController';
import EmailController from '../Controller/EmailController';
import RatingController from '../Controller/RatingController';
import FileUploadController from '../Controller/FileUploadController';
import NumericController from '../Controller/NumericController';
import ScaleController from '../Controller/ScaleController';
import DescriptionController from '../Controller/DescriptionController';
import ImageChoiceController from '../Controller/ImageChoiceController';
import QuestionGroupController from '../Controller/QuestionGroupController';
import LinkController from '../Controller/LinkController';
import RankingController from '../Controller/RankingController';
import PaymentController from '../Controller/PaymentController';
import MatrisController from '../Controller/MatrisController';
import { toast } from 'react-toastify';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from './common/Header'
function SurveyCreate({ updatesurvey, fetchsurveyById, updatesurveyfeature }) {
    const [items, setItems] = useState([]);
    const [FinishWelcomeitems, setFinishWelcomeitems] = useState([]);
    const [item, setItem] = useState([]);
    const [survey, setSurvey] = useState({});
    const [isOpen, setIsOpen] = useState(true, "")
    const [edit, setEdit] = useState(false);
    const [shouldReload, setShouldReload] = useState(false);
    const { surveyId } = useParams();
    const navigate = useNavigate();

    const controllers = [
        { type: "short_text", Component: ShortTextController, setItemsFn: setItems },
        { type: "long_text", Component: LongTextController, setItemsFn: setItems },
        { type: "welcome", Component: WelcomeTextController, setItemsFn: setFinishWelcomeitems, items: FinishWelcomeitems },
        { type: "finish", Component: FinishTextController, setItemsFn: setFinishWelcomeitems, items: FinishWelcomeitems },
        { type: "multiple_choice", Component: MultipleChoiceController, setItemsFn: setItems },
        { type: "dropdown", Component: DropdownController, setItemsFn: setItems },
        { type: "email", Component: EmailController, setItemsFn: setItems },
        { type: "rating", Component: RatingController, setItemsFn: setItems },
        { type: "file_upload", Component: FileUploadController, setItemsFn: setItems },
        { type: "numeric", Component: NumericController, setItemsFn: setItems },
        { type: "scale", Component: ScaleController, setItemsFn: setItems },
        { type: "description", Component: DescriptionController, setItemsFn: setItems },
        { type: "image_choice", Component: ImageChoiceController, setItemsFn: setItems },
        { type: "question_group", Component: QuestionGroupController, setItemsFn: setItems },
        { type: "link", Component: LinkController, setItemsFn: setItems },
        { type: "ranking", Component: RankingController, setItemsFn: setItems },
        { type: "payment", Component: PaymentController, setItemsFn: setItems },
        { type: "matris", Component: MatrisController, setItemsFn: setItems },
    ];

    useEffect(() => {
        async function loadSurvey() {
            try {
                const survey = await fetchsurveyById(surveyId);
                setSurvey(survey);
                setItems(survey?.items);
                setFinishWelcomeitems(survey?.FinishWelcomeitems);
            } catch (err) {
                console.error("Anket yüklenemedi:", err);
            }
        }

        loadSurvey();
        setShouldReload(false); // tekrar yükleme bayrağını kapat
    }, [shouldReload]); // sadece bayrak değiştiğinde tetiklenir


    // DnD kütüphanesini kullanarak sürükleme ve bırakma işlemlerini yönetiyoruz
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5, // fare için hassasiyet
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 0,      // parmak basılı tutma süresi (ms)
                tolerance: 1,   // parmak oynatma hassasiyeti (px)
            },
        })
    );

    // Sürükleme işlemi tamamlandığında çağrılır
    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            const oldIndex = items.findIndex((item) => item.id === active.id);
            const newIndex = items.findIndex((item) => item.id === over?.id);

            const newItems = arrayMove(items, oldIndex, newIndex);
            setItems(newItems);

            // Sıralama sonrası güncelle
            updatesurvey({
                surveyId,
                items: newItems,
                FinishWelcomeitems,
            });
            setShouldReload(true); // yeniden yükleme tetiklenir
        }
    };

    const handleDelete = (id) => {
        setItems((prevItems) => {
            const newItems = prevItems.filter(item => item.id !== id);
            updatesurvey({ surveyId, items: newItems, FinishWelcomeitems }); // güncel state ile çağır
            setShouldReload(true); // yeniden yükleme tetiklenir
            return newItems;
        });
        toast.success("Öğe Silindi id: " + id);
    };

    const handleDeleteWelcomeFinish = (id) => {
        setFinishWelcomeitems((prev) => {
            const newFinishItems = prev.filter(item => item.id !== id);
            updatesurvey({ surveyId, items, FinishWelcomeitems: newFinishItems }); // güncel state ile çağır
            setShouldReload(true); // yeniden yükleme tetiklenir
            return newFinishItems;
        });
        toast.success("Öğe Silindi id: " + id);
    };


    // Yeni öğe ekleme işlemi
    const handleAddItem = (item) => {
        if (survey.active) {
            toast.info("Aktif anket düzenlenemez.");
            return;
        }
        if (item.id === "welcome") {
            const welcomeItem = FinishWelcomeitems?.find(item => item.id.includes("welcome"));
            if (!welcomeItem) {
                setIsOpen([true, item.id])
                setItem(item); // Seçilen öğeyi ayarla
            } else {
                toast.warning("Giriş sayfası zaten var")
            }
        } else if (item.id === "finish") {
            const finishItem = FinishWelcomeitems?.find(item => item.id.includes("finish"));
            if (!finishItem) {
                setIsOpen([true, item.id])
                setItem(item); // Seçilen öğeyi ayarla
            } else {
                toast.warning("Bitiş sayfası zaten var")
            }
        } else if (item.id !== "" && item.id !== "welcome" && item.id !== "finish") {
            setIsOpen([true, item.id])
            setItem(item); // Seçilen öğeyi ayarla
        }
    };

    const handleEdit = (item) => {
        if (survey.active) {
            toast.info("Aktif anket düzenlenemez.");
            return;
        }
        const type = item.id.split("-")[0]; // örn: short_text
        const count = item.id.split("-")[1]
        if (type === "welcome") {
            setEdit(true);
            setIsOpen([true, type, count, item]);  // Modal'ı aç
            setItem(item);                        // Seçilen öğeyi gönder
        }

        if (type === "finish") {
            setEdit(true);
            setIsOpen([true, type, count, item]);  // Modal'ı aç
            setItem(item);                        // Seçilen öğeyi gönder
        }

        setEdit(true);
        setIsOpen([true, type, count, item]);  // Modal'ı aç
        setItem(item);                        // Seçilen öğeyi gönder
    };

    const closeModal = () => {
        setIsOpen([false, ""]);
        setItem(null); // item state'ini tamamen sıfırla
        setEdit(false);
    };
    function yonlendir() {
        navigate('/anketolustur',{replace: true });
    }

    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <>
            <Header
                isEditMode={true}
                surveyData={survey}
                onBackToMain={() => yonlendir()}
                selectedGroup={"Anketler"}
                onUpdateSurvey={(updatedSurvey) => { setSurvey(updatedSurvey.updatedSurvey) }}
                Sidebar={(sideBar) => { setSidebarOpen(sideBar) }}
                updatesurveyfeature={updatesurveyfeature}
            />
            <div className={survey.active ? "flex justify-between gap-4 w-full pl-2 blur-sm" : "flex justify-between gap-4 w-full pl-2"}>
                {/* Sol Panel */}
                <div>
                    <Component
                        onAddItem={survey.active ? () => toast.info("Aktif anket düzenlenemez.") : handleAddItem}
                        sideBar={sidebarOpen}
                        setSidebarOpen={() => setSidebarOpen(false)}
                    />
                </div>
                {controllers.map(({ type, Component, setItemsFn, items: specificItems }) => {
                    const wrappedSetItems = (newItem) => {
                        setItemsFn((prevItems) => {
                            const updatedItems = Array.isArray(newItem) ? newItem : [...prevItems, newItem];
                            updatesurvey({
                                surveyId,
                                items: type === "welcome" || type === "finish" ? items : updatedItems,
                                FinishWelcomeitems: type === "welcome" || type === "finish" ? updatedItems : FinishWelcomeitems,
                            });
                            setShouldReload(true); // yeniden yükleme tetiklenir
                            return updatedItems;
                        });
                    };
                    return (
                        <Component
                            key={type}
                            isOpen={isOpen[1] === type ? isOpen[0] : false}
                            setControllerOpen={() => { closeModal() }}
                            setItems={wrappedSetItems}
                            Item={item}
                            items={specificItems || items}
                            count={edit ? " Oluşturulma değeri " + isOpen[2] : items?.length + 1}
                            SetEdit={(deger) => setEdit(deger)}
                            Edit={edit}
                        />
                    );
                })}
                {/* Sağ Panel */}
                <div className="flex-1 rounded-lg space-y-4 mr-5">
                    {/* Hoşgeldin Sayfası */}
                    {(() => {
                        const welcomeItem = FinishWelcomeitems?.find(item => item.id.includes("welcome"));
                        if (!welcomeItem) {
                            return (
                                <div className="w-full border-secondary-light border border-dashed p-4 rounded-lg text-center text-primary-darktext flex items-center justify-center gap-2 bg-neutral/50">
                                    <RxEnter size={25} />
                                    Hoşgeldin Sayfası
                                </div>
                            );
                        }
                        return (
                            <div className="w-full border-secondary-light border p-4 rounded-lg text-primary-darktext bg-neutral/50 space-y-1 shadow-sm">
                                <ComponentViewItems
                                    item={welcomeItem}
                                    onDelete={() => handleDeleteWelcomeFinish(welcomeItem.id)}
                                    count={welcomeItem.label}
                                    SetEdit={(deger) => setEdit(deger)}
                                    Edit={edit}
                                    onClick={() => { handleEdit(welcomeItem) }}
                                />
                            </div>
                        );
                    })()}
                    {/* Sürükle Bırak Alanı */}
                    {items?.length > 0 ? (<div className="w-full border-secondary-light border p-4 rounded-lg text-primary-darktext bg-neutral/50 space-y-1 shadow-sm">
                        {survey.active === false ? (
                            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                                <SortableContext
                                    items={items.filter(item => !item.id.includes("welcome") && !item.id.includes("finish")).map(item => item.id)}
                                    strategy={verticalListSortingStrategy}
                                >
                                    <div className="space-y-2 overflow-scroll overflow-x-hidden h-[304px] w-[100%]">
                                        {items
                                            .filter(item => !item.id.includes("welcome") && !item.id.includes("finish"))
                                            .map((item, index) => (
                                                <div key={item.id} className="w-full">
                                                    <ComponentViewItems
                                                        item={item}
                                                        onDelete={handleDelete}
                                                        count={`${index + 1} - ${item.label}`}
                                                        onClick={() => handleEdit(item)}
                                                    />
                                                </div>
                                            ))}
                                    </div>
                                </SortableContext>
                            </DndContext>
                        ) : (
                            // DnD olmadan sadece sıralı listeyi göster
                            <div className="space-y-2 overflow-scroll overflow-x-hidden h-[304px] w-[100%]">
                                {items
                                    .filter(item => !item.id.includes("welcome") && !item.id.includes("finish"))
                                    .map((item, index) => (
                                        <div key={item.id} className="w-full">
                                            <ComponentViewItems
                                                item={item}
                                                count={`${index + 1} - ${item.label}`}
                                                onClick={() => handleEdit(item)}
                                            />
                                        </div>
                                    ))}
                            </div>
                        )}
                    </div>) : (<div className="w-full border-secondary-light border border-dashed p-4 rounded-lg text-center text-primary-darktext flex items-center justify-center gap-2 bg-neutral/50">
                        <LuTableOfContents size={25} />
                        İçerik Alanı
                    </div>)
                    }
                    {/* Bitiş Sayfası */}
                    {(() => {
                        const finishItem = FinishWelcomeitems?.find(item => item.id.includes("finish"));
                        if (!finishItem) {
                            return (
                                <div className="w-full border-secondary-light border border-dashed p-4 rounded-lg text-center text-primary-darktext flex items-center justify-center gap-2 bg-neutral/50">
                                    <MdOutlineWavingHand size={25} />
                                    Bitiş Sayfası
                                </div>
                            );
                        }
                        return (
                            <div className="w-full border-secondary-light  border p-4 rounded-lg text-primary-darktext bg-neutral/50 space-y-1 shadow-sm">
                                <ComponentViewItems
                                    item={finishItem}
                                    onDelete={() => handleDeleteWelcomeFinish(finishItem.id)}
                                    count={finishItem.label}
                                    SetEdit={(deger) => setEdit(deger)}
                                    Edit={edit}
                                    onClick={() => { handleEdit(finishItem) }}
                                />
                            </div>
                        );
                    })()}
                </div>
            </div>
        </>
    );
}

export default SurveyCreate;
