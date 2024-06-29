import MainModel from "../models/Main.model.js";

export const IntensityVsLikelihood = async (req, res) => {
  try {
    const data = await MainModel.aggregate([
      {
        $project: {
          intensity: 1,
          likelihood: 1,
        },
      },
    ]);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const RelevanceVsYear = async (req, res) => {
  try {
    const data = await MainModel.aggregate([
      {
        $match: {
          start_year: {
            $exists: true,
            $ne: "",
          },
        },
      },
      {
        $project: {
          relevance: 1,
          start_year: 1,
        },
      },
    ]);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const CountryVsTopic = async (req, res) => {
  try {
    const data = await MainModel.aggregate([
      {
        $project: {
          country: 1,
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

export const RegionVsRelevance = async (req, res) => {
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
        $match: {
          relevance: {
            $exists: true,
            $ne: "",
          },
        },
      },
      {
        $project: {
          region: 1,
          relevance: 1,
        },
      },
    ]);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
