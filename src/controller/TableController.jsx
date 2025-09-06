import React, { useState, useEffect } from "react";
import TableSettingsModal from "../modal/TableSettingsModal";
import { toast } from "react-hot-toast";

function TableController({
  isOpen,
  setControllerOpen,
  items,
  Item,
  setItems,
  count,
  Edit,
  SetEdit,
  SurveyType,
}) {
  const [TableData, setTableData] = useState({});

  useEffect(() => {
    if (!Item.id) return;
    if (
      !TableData?.title ||
      (!TableData.MemberSatificaitonMatris &&
        (!TableData?.data?.rows?.length > 0 ||
          !TableData?.data?.columns?.length > 0))
    ) {
      toast.error("boş değerler var");
    }

    const updatedItem = {
      ...Item,
      title: TableData.title,
      helpText: TableData.helpText,
      data: {
        rows: TableData.data.rows,
        columns: TableData.data.columns,
      },
      complusory: TableData.complusory,
      allowCustomValue: TableData.allowCustomValue || false,
      SurveyNumberVisible: TableData.SurveyNumberVisible,
      MemberSatificaitonMatris: TableData.MemberSatificaitonMatris,
    };

    if (Edit) {
      const updatedItems = items.map((i) =>
        i.id === Item.id ? updatedItem : i,
      );
      setItems(updatedItems);
      toast.success("Bileşen güncellendi");
    } else {
      const newItem = {
        ...updatedItem,
        id: Item.id + "-" + count,
      };
      setItems([...items, newItem]);
      toast.success("Yeni bileşen eklendi");
    }

    SetEdit(false);
    setControllerOpen(false);
  }, [TableData]);

  return (
    <TableSettingsModal
      isOpen={isOpen}
      onClose={() => {
        setControllerOpen(false);
        SetEdit(false);
      }}
      onSave={(data) => setTableData(data)}
      count={count}
      initialData={Edit ? Item : {}}
      surveyType={SurveyType}
    />
  );
}

export default TableController;
