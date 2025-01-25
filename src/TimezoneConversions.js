import React from 'react';
import { TableView, TableHeader, TableBody, Column, Row, Cell, View } from '@adobe/react-spectrum';
import CheckmarkCircle from '@spectrum-icons/workflow/CheckmarkCircle';
import CloseCircle from '@spectrum-icons/workflow/CloseCircle';
import './App.css'; // Ensure the CSS file is imported

function TimezoneConversions({ selectedDateTime }) {
  const cities = [
    { city: 'San Jose', zone: 'America/Los_Angeles', abbreviation: 'PST' },
    { city: 'Austin', zone: 'America/Chicago', abbreviation: 'CST' },
    { city: 'NYC', zone: 'America/New_York', abbreviation: 'EST' },
    { city: 'London', zone: 'Europe/London', abbreviation: 'GMT' },
    { city: 'Bucharest', zone: 'Europe/Bucharest', abbreviation: 'EET' },
    { city: 'Bangalore', zone: 'Asia/Kolkata', abbreviation: 'IST' },
    { city: 'Tokyo', zone: 'Asia/Tokyo', abbreviation: 'JST' },
  ];

  const conversions = cities.map(({ city, zone, abbreviation }) => {
    const convertedTime = selectedDateTime.setZone(zone);
    const isWorkingHour = convertedTime.weekday >= 1 && convertedTime.weekday <= 5 && convertedTime.hour >= 9 && convertedTime.hour < 17;
    return {
      abbreviation,
      city,
      time: convertedTime.toFormat('hh:mm a'),
      day: convertedTime.toFormat('ccc'), // Abbreviate the day to three letters
      isWorkingHour,
    };
  });

  return (
    <div>
      <h2>Timezone conversions</h2>
      <View width="100%">
        <TableView aria-label="Timezone Conversions" width="100%">
          <TableHeader>
            <Column key="city" UNSAFE_className="city-column" style={{ width: '2fr' }}>City</Column>
            <Column key="day" style={{ width: '1fr' }}>Day</Column>
            <Column key="time" style={{ width: '1.5fr' }}>Time</Column>
            <Column key="workingHours" style={{ width: '0.5fr' }}>
              <span className="sr-only">Working hours</span>
            </Column>
          </TableHeader>
          <TableBody>
            {conversions.map((conversion, index) => (
              <Row key={index}>
                <Cell>
                  <span>{conversion.abbreviation}</span>
                  <span className="city-name"> – {conversion.city}</span>
                </Cell>
                <Cell>{conversion.day}</Cell>
                <Cell>{conversion.time}</Cell>
                <Cell>
                  {conversion.isWorkingHour ? (
                    <>
                      <CheckmarkCircle aria-hidden="true" UNSAFE_className="checkmark-circle" />
                      <span className="sr-only">In working hours</span>
                    </>
                  ) : (
                    <>
                      <CloseCircle aria-hidden="true" UNSAFE_className="close-circle" />
                      <span className="sr-only">Non-working hours</span>
                    </>
                  )}
                </Cell>
              </Row>
            ))}
          </TableBody>
        </TableView>
      </View>
    </div>
  );
}

export default TimezoneConversions;