import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Search from '../search/search'
import { useState } from 'react';
import { Options, url } from "../../api"
import Ticket from '../ticketCard/Ticket'
import Spinner from 'react-bootstrap/Spinner';
//add loading screen on button click of find flights
function BookingCard() {
  // const [Sid, setSid] = useState(null)
  const [numAdults, setnumAdults] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [ticketData, setTicketData] = useState(null)
  const [selectedDate, setSelectedDate] = useState('');
  const [formattedDate, setFormattedDate] = useState('');
  const [originCode, setoriginCode] = useState(null);
  const [destiCode, setdestiCode] = useState(null);
  const [selectedType, setselectedType] = useState('');
  //formatting date input to match the structure of the api query

  const formatDate = (event) => {
    const inputDate = event.target.value;
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    setSelectedDate(inputDate);
    setFormattedDate(formattedDate);
  };
  const handleOnSearchChange = (searchData, index) => {
    if (index === 0) {
      setoriginCode(searchData);
    } else if (index === 1) {
      setdestiCode(searchData);
    }
  }
  const handleSelectChange = (event) => {
    setselectedType(event.target.value)
  }
  const handleInputChange = (event) => {
    setnumAdults(event.target.value);
  };
  const handleButtonClick = async () => {
    setIsLoading(true);
    if (originCode && destiCode && formattedDate) {
      // Make API call after obtaining req params from console to search flights
      try {
        const response = await fetch(`${url}/getFilters?sourceAirportCode=${originCode.value}&destinationAirportCode=${destiCode.value}&date=${formattedDate}&itineraryType=ONE_WAY&sortOrder=PRICE&numAdults=${numAdults}&numSeniors=0&classOfService=${selectedType}`, Options);
        const result = await response.json();
        console.log(result);
        // setSid(result.search_params.sid)

        //second fetch after getting params

        // if (Sid) {
        //   try {
        //     const response = await fetch(`${url}/flights/poll?sid=${Sid}`, Options);
        //     const tickets = await response.json();
        //     console.log(tickets);
        //     setTicketData(tickets);
        //   } catch (error) {
        //     console.error(error);
        //   }
        // }
      } catch (error) {
        console.error(error);
      }
    } else {
      alert('Please select values for all inputs fields');
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  };
  return (
    <>
      <Card className='mb-4'>
        <Card.Body>
          <Card.Title>Book A  Flight Anywhere</Card.Title>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} >
                <Form.Label>From</Form.Label>
                <Search onSearchChange={(searchData) => handleOnSearchChange(searchData, 0)} required />
              </Form.Group>

              <Form.Group as={Col} >
                <Form.Label>To</Form.Label>
                <Search onSearchChange={(searchData) => handleOnSearchChange(searchData, 1)} required />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} >
                <Form.Label>Date</Form.Label>
                <Form.Control type="date" id="dateInput" value={selectedDate} onChange={formatDate} required />
              </Form.Group>

              <Form.Group as={Col} >
                <Form.Label></Form.Label>
                <Form.Select aria-label="Default select example" value={selectedType} onChange={handleSelectChange}>
                  <option>Ticket Type</option>
                  <option value="ECONOMY">Economy</option>
                  <option value="BUSINESS">Business</option>
                  <option value="FIRST">First Class</option>
                  <option value="PREMIUM_ECONOMY">Premium Economy</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} >
                <Form.Label>No of Seats</Form.Label>
                <Form.Control type='number' min={1} defaultValue={1} placeholder='enter number of Adults travelling' value={numAdults}
                  onChange={handleInputChange} required />
              </Form.Group>
            </Row>
            <Button className='mt-3' variant="outline-success" onClick={handleButtonClick} disabled={isLoading}>{isLoading ? (
              <Spinner animation="border" variant="success" />
            ) : (
              'Find Flights'
            )}</Button>
          </Form>
        </Card.Body>
      </Card >

      {ticketData && selectedDate &&
        <Ticket data={ticketData} sdate={selectedDate} originCode={originCode.value} destiCode={destiCode.value} ticketType={selectedType} />
      }
    </>
  );
}
export default BookingCard;