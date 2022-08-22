export async function normalizeMd5SumInput (input) {
  if (input instanceof Blob) {
    return new Uint8Array(await input.arrayBuffer())
  }
}

export function normalizeOKResult (data) {
  return {
    code: 0,
    result: data
  }
}