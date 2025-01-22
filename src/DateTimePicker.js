import React, { useState } from 'react';
import { Flex, View, Button } from '@adobe/react-spectrum';
import { DatePicker } from '@react-spectrum/datepicker';
import { Picker, Item } from '@react-spectrum/picker';
import { RadioGroup, Radio } from '@react-spectrum/radio';
import { parseDate } from '@internationalized/date';
import TimezoneConversions from './TimezoneConversions';
import { DateTime } from 'luxon';

function DateTimePicker() {
  const [selectedDate, setSelectedDate] = useState(parseDate(new Date().toISOString().split('T')[0]));
  const [selectedHour, setSelectedHour] = useState('12');
  const [selectedMinutes, setSelectedMinutes] = useState('00');
  const [selectedAmPm, setSelectedAmPm] = useState('AM');
  const [showConversions, setShowConversions] = useState(false);

  const handleConvert = () => {
    setShowConversions(true);
  };

  const getSelectedDateTime = () => {
    const hour = selectedAmPm === 'AM' ? parseInt(selectedHour) % 12 : (parseInt(selectedHour) % 12) + 12;
    return DateTime.fromObject({
      year: selectedDate.year,
      month: selectedDate.month,
      day: selectedDate.day,
      hour: hour,
      minute: parseInt(selectedMinutes),
    }, { zone: 'America/New_York' });
  };

  return (
    <View padding="size-200" maxWidth="size-6000" margin="auto">
      <Flex direction="column" gap="size-200">
        <DatePicker
          label="Date"
          value={selectedDate}
          onChange={setSelectedDate}
        />
        <Flex direction="row" gap="size-200">
          <Picker label="Hour" selectedKey={selectedHour} onSelectionChange={setSelectedHour}>
            <Item key="1">1</Item>
            <Item key="2">2</Item>
            <Item key="3">3</Item>
            <Item key="4">4</Item>
            <Item key="5">5</Item>
            <Item key="6">6</Item>
            <Item key="7">7</Item>
            <Item key="8">8</Item>
            <Item key="9">9</Item>
            <Item key="10">10</Item>
            <Item key="11">11</Item>
            <Item key="12">12</Item>
          </Picker>
          <Picker label="Minutes" selectedKey={selectedMinutes} onSelectionChange={setSelectedMinutes}>
            <Item key="00">00</Item>
            <Item key="15">15</Item>
            <Item key="30">30</Item>
          </Picker>
          <RadioGroup label="AM/PM" selectedKey={selectedAmPm} onChange={setSelectedAmPm}>
            <Radio value="AM">AM</Radio>
            <Radio value="PM">PM</Radio>
          </RadioGroup>
        </Flex>
        <Button variant="cta" onPress={handleConvert}>Convert</Button>
        {showConversions && <TimezoneConversions selectedDateTime={getSelectedDateTime()} />}
      </Flex>
    </View>
  );
}

export default DateTimePicker;