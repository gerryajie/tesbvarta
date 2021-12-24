const express = require("express");
const app = express();
const { titik, sequelize } = require("./models");
const cors = require("cors");

app.use(cors());
app.get("/home", async (req, res) => {
  try {
    let query = `with user_per_titik as (
    select 
        longtitude, latitude, sum(user_count) total_user, min(time) mins, max(time) maks
    from titik 
        where time between '2021-10-20 07:00:00' and '2021-10-20 08:00:00' 
    group by longtitude, latitude
)
select 
    t.longtitude, t.latitude, t.brand, 
    CONCAT(
'2021-10-20 07:00:00' , ' to ' , '2021-10-20 08:00:00') as 'range', 
    sum(user_count) user_per_brand, upt.total_user
from titik t
    left join user_per_titik upt on upt.longtitude = t.longtitude and upt.latitude = t.latitude
    where time between '2021-10-20 07:00:00' and '2021-10-20 08:00:00'
group by t.longtitude, t.latitude, t.brand, upt.total_user`;

    let getData = await sequelize.query(query);
    getData = getData[0];

    if (getData.length === 0) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "Event not found - retrieve all event",
      });
    }

    res.status(200).json({ success: true, data: getData });
  } catch (error) {
    console.log(error);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server running on port ${port}`));
