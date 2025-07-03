import React, { useState, useEffect } from 'react';
import PaymentSettingsModal from '../Modal/PaymentSettingsModal';
import { toast } from "react-toastify"; // toast ekle

function PaymentController({ isOpen, setControllerOpen, items, Item, setItems, count, Edit, SetEdit }) {
    const [PaymentData, setPaymentData] = useState({});

    useEffect(() => {
        if (!Item.id) return;
        if (!PaymentData?.title || !PaymentData?.helpText || !PaymentData?.amount > 0) toast.warn("boş değerler var");

        const updatedItem = {
            ...Item,
            title: PaymentData.title,
            helpText: PaymentData.helpText,
            amount: PaymentData.amount,
            SurveyNumberVisible: PaymentData.SurveyNumberVisible,
            currency: PaymentData.currency,
        };

        if (Edit) {
            const updatedItems = items.map((i) => (i.id === Item.id ? updatedItem : i));
            setItems(updatedItems);
            toast.success("Bileşen güncellendi");
            SetEdit(false);
        } else {
            const newItem = {
                ...updatedItem,
                id: Item.id + '-' + count,
            };
            setItems([...items, newItem]);
            toast.success("Yeni bileşen eklendi");
        }

        setControllerOpen(false);
    }, [PaymentData]);

    return (
        <PaymentSettingsModal
            isOpen={isOpen}
            onClose={() => { setControllerOpen(false); SetEdit(false) }}
            onSave={(data) => setPaymentData(data)}
            count={count}
            initialData={Edit ? Item : {}}
        />
    );
}

export default PaymentController;