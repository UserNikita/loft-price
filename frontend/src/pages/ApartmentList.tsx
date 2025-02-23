import {useEffect, useState} from 'react'
import Container from "react-bootstrap/Container"
import Table from "react-bootstrap/Table"
import {Button} from "react-bootstrap"


type Apartment = {
    id: string
    created_time: string
    url: string
    address: string
    price: number
    deal_type: string
    location: {
        coordinates: [longitude: number, latitude: number]
    }
}

type Statistics = {
    count: number
}


function ApartmentList() {
    const [isLoading, setIsLoading] = useState(true)
    const [apartments, setApartments] = useState<Apartment[]>([])
    const [statistics, setStatistics] = useState<Statistics | null>(null)

    useEffect(() => {
        fetch("http://localhost:8000/api/apartments").then(response => {
            response.json().then(jsonData => {
                setApartments(jsonData)
                setIsLoading(false)
            })
        })
        fetch("http://localhost:8000/api/apartments/stats").then(response => {
            response.json().then(jsonData => {
                setStatistics(jsonData)
            })
        })
    }, []);

    function handleDelete(id: string) {
        console.log(id)
        fetch("http://localhost:8000/api/apartments/" + id, {method: "DELETE"}).then(response => {
            console.log(response)
        })
    }

    return (
        <Container>
            <div>Количество квартир в базе данных: {statistics?.count}</div>
            <Table bordered>
                <thead>
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Адрес</th>
                        <th scope='col'>Цена</th>
                        <th scope='col'>Тип объявления</th>
                        <th scope='col'>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        isLoading &&
                        <tr>
                            <th scope='row'>1</th>
                            <td><span className='placeholder col-6'/></td>
                            <td><span className='placeholder col-4'></span></td>
                            <td><span className='placeholder col-4'></span></td>
                            <td><span className='placeholder col-4'></span></td>
                        </tr>
                    }
                    {
                        apartments.map((apartment, index) => {
                            return (
                                <tr key={apartment.id}>
                                    <th scope='row'>{index}</th>
                                    <td>
                                        <a href={apartment.url}>
                                            {apartment.address}
                                        </a>
                                    </td>
                                    <td>{apartment.price}</td>
                                    <td>{apartment.deal_type}</td>
                                    <td>
                                        <Button onClick={() => handleDelete(apartment.id)}>Удалить</Button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </Container>
    )
}

export default ApartmentList
