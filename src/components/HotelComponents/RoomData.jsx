export function getCapacity(rooms) {
    return rooms.reduce((totalCapacity, room) => {
      const roomCapacity = room.capacity;
      const reservedCapacity = room.Booking ? room.Booking.length : 0;
      return totalCapacity + roomCapacity - reservedCapacity;
    }, 0);
  }

  export function getRoomTypes(rooms) {
    const roomTypes = {
      1: false,
      2: false,
      3: false,
    };

    rooms.forEach((room) => {
      roomTypes[room.capacity] = true;
    });

    if (roomTypes[1] && !roomTypes[2] && !roomTypes[3]) {
      return "Single";
    } else if (roomTypes[2] && !roomTypes[1] && !roomTypes[3]) {
      return "Double";
    } else if (roomTypes[3] && !roomTypes[1] && !roomTypes[2]) {
      return "Triple";
    } else if (roomTypes[1] && roomTypes[2] && !roomTypes[3]) {
      return "Single e Double";
    } else if (roomTypes[1] && roomTypes[3] && !roomTypes[2]) {
      return "Single e Triple";
    } else if (roomTypes[2] && roomTypes[3] && !roomTypes[1]) {
      return "Double e Triple";
    } else if (roomTypes[1] && roomTypes[2] && roomTypes[3]) {
      return "Single, Double e Triple";
    } else {
      return "Não informado";
    }
  }