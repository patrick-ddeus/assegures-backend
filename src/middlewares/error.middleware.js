import httpStatus from "http-status";

export default function errorHandler (error, req, res, next) {
  if (error.name === "PropertiesQueryError") {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      error: error.message
    });
  }

  if (error?.code === 'P2002' && error.meta?.target?.includes('title')) {
    return res
      .status(httpStatus.CONFLICT)
      .json({ error: 'Erro, imóvel com esse título já cadastrado' })
  }
}