import React from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { LuTableOfContents } from "react-icons/lu";
import { RxEnter } from "react-icons/rx";
import { MdOutlineWavingHand } from "react-icons/md";

import ComponentViewItems from "../../components/common/ComponentViewItems";

export default function RightPanel({
  items,
  finishWelcomeItems,
  handleDelete,
  handleEdit,
  handleDeleteWelcomeFinish,
  handleDragEnd,
  setquestionsGuidanceMenuData,
  edit,
  setEdit,
  surveyType,
  isOpen,
  setIsOpen,
  item,
  controllers,
  updatesurvey,
  surveyId,
  setShouldReload,
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 0, tolerance: 1 },
    }),
  );

  const welcomeItem = finishWelcomeItems?.find((i) => i.id.includes("welcome"));
  const finishItem = finishWelcomeItems?.find((i) => i.id.includes("finish"));

  return (
    <div className="flex-1 rounded-lg space-y-4 mr-5">
      {/* Hoşgeldin Sayfası */}
      {!welcomeItem ? (
        <div className="w-full border-secondary-light border border-dashed p-4 rounded-lg text-center text-primary-darktext flex items-center justify-center gap-2 bg-neutral/50">
          <RxEnter size={25} />
          Hoşgeldin Sayfası
        </div>
      ) : (
        <div className="w-full border-secondary-light border p-4 rounded-lg text-primary-darktext bg-neutral/50 space-y-1 shadow-sm">
          <ComponentViewItems
            item={welcomeItem}
            onDelete={() => handleDeleteWelcomeFinish(welcomeItem.id)}
            count={welcomeItem.label}
            SetEdit={setEdit}
            Edit={edit}
            onClick={() => handleEdit(welcomeItem)}
          />
        </div>
      )}

      {/* Sürükle Bırak Alanı */}
      {items?.length > 0 ? (
        <div className="w-full border-secondary-light border p-4 rounded-lg text-primary-darktext bg-neutral/50 space-y-1 shadow-sm">
          {surveyType === false ? (
            <div className="space-y-2 overflow-scroll overflow-x-hidden h-[304px] w-[100%]">
              {items
                .filter(
                  (item) =>
                    !item.id.includes("welcome") && !item.id.includes("finish"),
                )
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
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={items
                  .filter(
                    (item) =>
                      !item.id.includes("welcome") &&
                      !item.id.includes("finish"),
                  )
                  .map((i) => i.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-2 overflow-scroll overflow-x-hidden h-[304px] w-[100%]">
                  {items
                    .filter(
                      (item) =>
                        !item.id.includes("welcome") &&
                        !item.id.includes("finish"),
                    )
                    .map((item, index) => (
                      <div key={item.id} className="w-full">
                        <ComponentViewItems
                          item={item}
                          onDelete={handleDelete}
                          count={`${index + 1} - ${item.label}`}
                          onClick={() => handleEdit(item)}
                          questionguidance={() =>
                            setquestionsGuidanceMenuData({
                              items,
                              item,
                              finishWelcomeitems: finishWelcomeItems || [],
                              isOpen: true,
                            })
                          }
                        />
                      </div>
                    ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </div>
      ) : (
        <div className="w-full border-secondary-light border border-dashed p-4 rounded-lg text-center text-primary-darktext flex items-center justify-center gap-2 bg-neutral/50">
          <LuTableOfContents size={25} />
          İçerik Alanı
        </div>
      )}

      {/* Bitiş Sayfası */}
      {!finishItem ? (
        <div className="w-full border-secondary-light border border-dashed p-4 rounded-lg text-center text-primary-darktext flex items-center justify-center gap-2 bg-neutral/50">
          <MdOutlineWavingHand size={25} />
          Bitiş Sayfası
        </div>
      ) : (
        <div className="w-full border-secondary-light  border p-4 rounded-lg text-primary-darktext bg-neutral/50 space-y-1 shadow-sm">
          <ComponentViewItems
            item={finishItem}
            onDelete={() => handleDeleteWelcomeFinish(finishItem.id)}
            count={finishItem.label}
            SetEdit={setEdit}
            Edit={edit}
            onClick={() => handleEdit(finishItem)}
          />
        </div>
      )}

      {controllers.map(
        ({ type, Component, setItemsFn, items: specificItems }) => {
          const wrappedSetItems = (newItem) => {
            setItemsFn((prevItems) => {
              const updatedItems = Array.isArray(newItem)
                ? newItem
                : [...prevItems, newItem];
              updatesurvey(surveyId, {
                items:
                  type === "welcome" || type === "finish"
                    ? items
                    : updatedItems,
                FinishWelcomeitems:
                  type === "welcome" || type === "finish"
                    ? updatedItems
                    : finishWelcomeItems,
              });
              setShouldReload(true);
              return updatedItems;
            });
          };
          return (
            <Component
              key={type}
              isOpen={isOpen[1] === type ? isOpen[0] : false}
              setControllerOpen={() => setIsOpen([false, ""])}
              setItems={wrappedSetItems}
              Item={item || {}}
              items={specificItems || items || []}
              count={
                edit ? " Oluşturulma değeri " + isOpen[2] : items?.length + 1
              }
              SetEdit={setEdit}
              Edit={edit}
              SurveyType={surveyType}
            />
          );
        },
      )}
    </div>
  );
}
