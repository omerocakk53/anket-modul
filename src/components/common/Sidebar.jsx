import React, { useEffect, useState } from "react";
import { FiPlus, FiFolderPlus, FiLogOut, FiFolder } from "react-icons/fi";
import { FaPoll } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { MdAutoFixNormal } from "react-icons/md";

export default function Sidebar({
  groupedSurveysData,
  selectedGroup,
  setSelectedGroup,
  username,
  handleLogout,
  openCreateSurveyModal,
  openCreateNewGroupModal,
  sidebar,
  user,
  fixsurvey,
}) {
  const [isVisible, setIsVisible] = useState(sidebar); // DOM'da görünüyor mu
  const [animationClass, setAnimationClass] = useState(""); // animasyon sınıfı

  useEffect(() => {
    if (sidebar) {
      setIsVisible(true); // görünür yap
      setAnimationClass("animate-slide-down-in"); // açılış animasyonu
    } else {
      setAnimationClass("animate-slide-down-out"); // kapanış animasyonu
      setTimeout(() => {
        setIsVisible(false); // animasyon bittikten sonra DOM'dan kaldır
      }, 400); // animasyon süresi (ms)
    }
  }, [sidebar]);

  const validGroupNames = Object.keys(groupedSurveysData).filter(
    (groupName) => groupName !== "Geçersiz Klasör Adı",
  );

  return (
    <div
      className={`xl:flex flex-col w-72 bg-neutral-white border-r border-neutral shadow-lg z-10  ${isVisible ? `absolute w-full ${animationClass}` : "hidden"}`}
    >
      <div className="p-6 border-b border-neutral bg-primary text-neutral-white flex items-center justify-center">
        <FaPoll className="h-8 w-8 mr-3 animate-pulse-slow" />
        <h1 className="text-2xl font-extrabold tracking-tight animate-fade-in-slide">
          OdaAnket
        </h1>
      </div>
      <div className="p-6 border-b border-neutral-light flex justify-between">
        <button
          className="flex items-center gap-1 px-4 py-2 text-sm text-primary-dark border border-primary rounded hover:bg-primary hover:text-white transition"
          onClick={openCreateSurveyModal}
        >
          <FiPlus className="h-6 w-6" />
          Yeni Anket Oluştur
        </button>
        {isVisible ? (
          <button
            onClick={() => setAnimationClass("animate-slide-down-out")}
            className="flex items-center gap-2 px-3 py-1 text-sm text-primary-dark rounded transition"
          >
            <IoMdClose className="hover:text-danger" size={24} />
          </button>
        ) : (
          <></>
        )}
      </div>
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        <h2 className="text-xs font-bold text-neutral-dark mb-3 px-2">
          Klasörler
        </h2>
        <ul className="space-y-1">
          <li>
            <button
              className="w-full text-left px-4 py-2 rounded-lg text-neutral-darkest hover:bg-neutral-light hover:text-primary transition-colors duration-200 flex items-center gap-3 font-medium"
              onClick={openCreateNewGroupModal}
            >
              <FiFolderPlus className="h-5 w-5 text-primary" />
              Yeni Klasör Oluştur
            </button>
          </li>
          <li>
            <button
              className="w-full text-left px-4 py-2 rounded-lg text-neutral-darkest hover:bg-neutral-light hover:text-primary transition-colors duration-200 flex items-center gap-3 font-medium"
              onClick={fixsurvey}
            >
              <MdAutoFixNormal className={`h-5 w-5`} />
              Anket Sihirbazı
            </button>
          </li>
          {validGroupNames.length === 0 ? (
            <li className="px-4 py-2 text-sm text-neutral-dark">
              Henüz klasör oluşturulmadı.
            </li>
          ) : (
            validGroupNames.map((groupName) => (
              <li
                key={groupName}
                className={`flex items-center justify-between px-4 py-2 rounded-lg cursor-pointer transition-colors duration-200
                  ${
                    selectedGroup === groupName
                      ? "bg-primary-light text-primary-text font-semibold shadow-sm"
                      : "text-neutral-darkest hover:bg-neutral-light hover:text-primary"
                  }`}
                onClick={() => setSelectedGroup(groupName)}
              >
                <div className="flex items-center gap-3 truncate">
                  <FiFolder
                    className={`h-5 w-5 ${selectedGroup === groupName ? "text-primary-text" : "text-primary-dark"}`}
                  />
                  <span className="truncate">{groupName}</span>
                </div>
                <span className="text-xs text-neutral-dark font-normal">
                  {groupedSurveysData[groupName].length}
                </span>
              </li>
            ))
          )}
        </ul>
      </nav>
      <div className="p-6 border-t border-neutral-light mt-auto">
        <div className="flex items-center justify-between text-neutral-darkest mb-3">
          <div className="flex items-center gap-2">
            <div className="avatar placeholder">
              <div className="bg-primary text-neutral-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                {username ? username.charAt(0).toUpperCase() : "U"}
              </div>
            </div>
            <span className="font-medium text-sm truncate">
              {username || "Kullanıcı"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
