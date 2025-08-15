import React, { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import toast from 'react-hot-toast';

import Header from '../Common/Header';
import QuestionsGuidancePopUp from '../Logic/QuestionsGuidancePopUp';

import SidebarPanel from './SidebarPanel';
import RightPanel from './RightPanel';

import useSurveyLoader from './hooks/useSurveyLoader';
import useDragAndDrop from './hooks/useDragAndDrop';
import useGuidance from './hooks/useGuidance';
import controllerList from './utils/controllerList';

function SurveyCreate({ updatesurvey, fetchsurveyById, updatesurveyfeature}) {
    const navigate = useNavigate();
    const { surveyId } = useParams();

    const {
        survey, setSurvey, items, setItems,
        finishWelcomeItems, setFinishWelcomeItems,
        variables, setVariables,
        shouldReload, setShouldReload
    } = useSurveyLoader(fetchsurveyById, surveyId);

    const { handleDragEnd, handleDelete, handleDeleteWelcomeFinish } = useDragAndDrop({
        items, setItems, finishWelcomeItems, setFinishWelcomeItems,
        updatesurvey, surveyId, setShouldReload
    });

    const {
        questionsGuidanceMenuData, handleQuestionGuidance,
        handleDeleteGuidance, setquestionsGuidanceMenuData
    } = useGuidance(items, finishWelcomeItems, variables, setVariables, updatesurvey, surveyId, setShouldReload);

    const [isOpen, setIsOpen] = useState([false, ""]);
    const [edit, setEdit] = useState(false);
    const [item, setItem] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const yonlendir = () => navigate('/anket', { replace: true });

    const handleAddItem = (item) => {
        if (survey.active) return toast.error("Aktif anket düzenlenemez.");
        const id = item.id;

        const hasWelcome = finishWelcomeItems?.find(i => i.id.includes("welcome"));
        const hasFinish = finishWelcomeItems?.find(i => i.id.includes("finish"));

        if (id === "welcome" && hasWelcome) return toast.error("Giriş sayfası zaten var");
        if (id === "finish" && hasFinish) return toast.error("Bitiş sayfası zaten var");

        setIsOpen([true, id]);
        setItem(item);
    };

    const handleEdit = (item) => {
        if (survey.active) return toast.error("Aktif anket düzenlenemez.");
        const [type, count] = item.id.split("-");
        setEdit(true);
        setIsOpen([true, type, count, item]);
        setItem(item);
    };

    return (
        <>
            <Header
                isEditMode
                surveyData={survey}
                onBackToMain={yonlendir}
                selectedGroup="Anketler"
                onUpdateSurvey={(updatedSurvey) => setSurvey(updatedSurvey.updatedSurvey)}
                Sidebar={setSidebarOpen}
                updatesurveyfeature={updatesurveyfeature}
            />

            <div className={`flex justify-between gap-4 w-full pl-2 ${survey.active ? "blur-sm" : ""}`}>
                <SidebarPanel
                    surveyActive={survey.active}
                    handleAddItem={handleAddItem}
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />

                <RightPanel
                    items={items}
                    finishWelcomeItems={finishWelcomeItems}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    handleDeleteWelcomeFinish={handleDeleteWelcomeFinish}
                    handleDragEnd={handleDragEnd}
                    setquestionsGuidanceMenuData={setquestionsGuidanceMenuData}
                    edit={edit}
                    setEdit={setEdit}
                    surveyType={survey.surveyType}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    item={item}
                    controllers={controllerList(setItems, setFinishWelcomeItems, finishWelcomeItems)}
                    updatesurvey={updatesurvey}
                    surveyId={surveyId}
                    setShouldReload={setShouldReload}
                />
            </div>

            <QuestionsGuidancePopUp
                guidance={questionsGuidanceMenuData}
                variables={variables}
                closeGuidance={(variables) => handleQuestionGuidance(variables, false)}
                onDelete={handleDeleteGuidance}
            />
        </>
    );
}

export default SurveyCreate;
