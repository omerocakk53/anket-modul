import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function NotFoundPage() {
    const navigate = useNavigate()
    useEffect(() => {
        // Kullanıcıyı bir önceki sayfaya yönlendir
        toast.error("Böyle bir sayfa yok !")
        setTimeout(() => {
            navigate(-1, { replace: true })
        }, 3000)
    }, [navigate]) // navigate dependency ekledik
    return (
        <></>
    )
}

export default NotFoundPage