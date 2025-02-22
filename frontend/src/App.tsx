import {useEffect, useState} from 'react'
import Container from "react-bootstrap/Container"
import CustomMap from "./pages/CustomMap.tsx";

type Apartment = {
    id: string
    address: string
    price: number
    price_period: string
}


function App() {
    const [isLoading, setIsLoading] = useState(true)
    const [apartments, setApartments] = useState<Apartment[]>([])

    // useEffect(() => {
    //     fetch("http://localhost:8000/api/apartments").then(response => {
    //         response.json().then(jsonData => {
    //             setApartments(jsonData)
    //             setIsLoading(false)
    //         })
    //     })
    // }, []);

    return (
        <Container>
            <CustomMap/>
            {/*<MDBTable bordered>*/}
            {/*    <MDBTableHead>*/}
            {/*        <tr>*/}
            {/*            <th scope='col'>#</th>*/}
            {/*            <th scope='col'>Address</th>*/}
            {/*            <th scope='col'>Price</th>*/}
            {/*            <th scope='col'>Price period</th>*/}
            {/*        </tr>*/}
            {/*    </MDBTableHead>*/}
            {/*    <MDBTableBody>*/}
            {/*        {*/}
            {/*            isLoading &&*/}
            {/*            <tr>*/}
            {/*                <th scope='row'>1</th>*/}
            {/*                <td><span className='placeholder col-6'/></td>*/}
            {/*                <td><span className='placeholder col-4'></span></td>*/}
            {/*                <td><span className='placeholder col-4'></span></td>*/}
            {/*            </tr>*/}
            {/*        }*/}
            {/*        {*/}
            {/*            apartments.map((apartment, index) => {*/}
            {/*                return (*/}
            {/*                    <tr key={apartment.id}>*/}
            {/*                        <th scope='row'>{index}</th>*/}
            {/*                        <td>{apartment.address}</td>*/}
            {/*                        <td>{apartment.price}</td>*/}
            {/*                        <td>{apartment.price_period}</td>*/}
            {/*                    </tr>*/}
            {/*                )*/}
            {/*            })*/}
            {/*        }*/}
            {/*    </MDBTableBody>*/}
            {/*</MDBTable>*/}
        </Container>
    )
}

export default App
