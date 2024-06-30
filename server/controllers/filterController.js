import MainModel from "../models/Main.model.js";

export const GetCountryData = async (req, res) => {
  try {
    const data = await MainModel.aggregate([
      {
        $match: {
          country: {
            $exists: true,
            $ne: "",
          },
        },
      },
      {
        $group: {
          _id: "$country",
        },
      },
      {
        $project: {
          country: 1,
        },
      },
    ]);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const GetRegionData = async (req, res) => {
  try {
    const data = await MainModel.aggregate([
      {
        $match: {
          region: {
            $exists: true,
            $ne: "",
          },
        },
      },
      {
        $group: {
          _id: "$region",
        },
      },
      {
        $project: {
          region: 1,
        },
      },
    ]);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const GetTopicData = async (req, res) => {
  try {
    const data = await MainModel.aggregate([
      {
        $match: {
          topic: {
            $exists: true,
            $ne: "",
          },
        },
      },
      {
        $group: {
          _id: "$topic",
        },
      },
      {
        $project: {
          topic: 1,
        },
      },
    ]);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const GetSectorData = async (req, res) => {
  try {
    const data = await MainModel.aggregate([
      {
        $match: {
          sector: {
            $exists: true,
            $ne: "",
          },
        },
      },
      {
        $group: {
          _id: "$sector",
        },
      },
      {
        $project: {
          sector: 1,
        },
      },
    ]);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
