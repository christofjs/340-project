class BookingUpdater {
  static async updateProperty(property_id) {
    const booking_id = document.getElementById("booking-id").value;

    if (!property_id || !booking_id) {
      throw new Error("Missing params");
    }

    fetch("/bookings/", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        id: booking_id,
        property_id,
      }),
    })
      .then((res) => {})
      .catch((e) => {
        console.error(e);
        throw new Error();
      });
  }

  static async addCustomer(customer_id) {
    console.log(customer_id);
    const booking_id = document.getElementById("booking-id").value;
    const payload = {
      booking_id,
      customer_ids: [customer_id],
    };

    fetch(`/bookings/customer`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    }).catch((e) => {
      console.error(e);
      throw new Error();
    });
  }

  static async removeCustomer(customer_id) {
    const booking_id = document.getElementById("booking-id").value;
    const payload = {
      booking_id,
      customer_ids: [customer_id],
    };

    fetch(`/bookings/customer`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    }).catch((e) => {
      console.error(e);
      throw new Error();
    });
  }

  update() {
    const booking_id = document.getElementById("booking-id").value;
    const start_date = document.getElementById("start_date").value;
    const end_date = document.getElementById("end_date").value;
    const property_id = document.querySelector(
      "#current-property tbody tr input"
    ).value;

    fetch("/bookings/", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        id: booking_id,
        start_date,
        end_date,
        property_id,
      }),
    })
      .then((res) => {
        // Referenced from here https://stackoverflow.com/questions/39735496/redirect-after-a-fetch-post-call
        // fetch has a response object that contains a url if the server indicated to redirect.
        if (res.redirected) {
          window.location.href = res.url;
        }
      })
      .catch((e) => {
        console.error(e);
        throw new Error();
      });
  }
}
