import sjcl from 'sjcl'
import { h2Curve, getCurveParams, computeSWUCoordinates } from './h2c'

export function h2Curve(alpha: sjcl.BitArray, ecSettings: Object): sjcl.SjclEllipticalPoint

export function getCurveParams(curve: sjcl.SjclEllipticalCurve): Object

export function computeSWUCoordinates(u: sjcl.BigNumber, params: Object)

export function simplifiedSWU(
  alpha: sjcl.BitArray,
  activeCurve: sjcl.SjclEllipticalCurve,
  hash: sjcl.SjclHash,
  label: String
): sjcl.SjclEllipticalPoint
