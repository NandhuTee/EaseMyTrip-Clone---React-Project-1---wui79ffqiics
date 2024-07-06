# Flight List Details

## Overview

This document provides details about the FlightList component and its functionalities.

## Structure

The FlightList component is structured into several parts:

### 1. FlightSearchSection

```plaintext
    🛫 FlightSearchSection
        📐 Background: #2f81ed
        🌈 Gradient: #2F80ED → #56CCF2
        📏 Width: 100%
        📐 Height: 17vh
        📐 Display: flex
        ↕️ Flex Direction: column
        🔄 Justify Content: center
        ↔️ Align Items: center
```
```plaintext
    📦 FlightDataBox
        🎨 Border: 1px solid #c9d7e1
        🌌 Box Shadow: rgb(0 0 0 / 20%)
        🎨 Background: #fff
        📏 Width: 100%
        📐 Height: 100%
        📐 Margin Top: 20px
        📐 Border Radius: 5px
        🔄 Display: flex
        🔄 Flex Direction: column
        🌊 Overflow: hidden
```

```plaintext
        🔍 FilterData
        📏 Margin Top: 12px
        📏 Width: 100%
        🎨 Padding: 15px
        📐 Border Radius: 4px
        🎨 Background: #FFF
        🔒 Position: sticky
```

```plaintext
    📱 Mobile View
        🛫 FlightSearchSection
            📏 Height: auto
        🔍 FlightDataBox
            🔄 Flex Direction: column
            📏 Height: auto
            ↔️ Align Items: center
            ↔️ Gap: 15px
        🔍 MainDivFlightRecordSearch
            📏 Width: 100%
            📐 Margin Top: 10px
            📐 Border Radius: 5px
            🎨 Border: 1px solid #e0dede
        ❌ DividerFlightRecord
            🔒 Display: none
        🔄 SwapImageSection
            🔒 Display: none
        🔄 FilterSideBar
            🔒 Display: none
        🔄 BookNowInRow
            🔒 Display: none
        🔄 DurationFlightRecords
            🔒 Display: none
        🔄 FlighttimeDurationSection
            ↔️ Justify Content: space-between
        📱 MobileViewBtn
            🔓 Display: block
            📏 Width: 95%
            📐 Margin Bottom: 5px
```

```lua 
Graph Output
|-------------------|
|     FlightList    |
|-------------------|
| 🛫 FlightSearchSec|
|-------------------|
| 📦 FlightDataBox  |
|-------------------|
|  🔍 FilterData    |
|-------------------|

```


