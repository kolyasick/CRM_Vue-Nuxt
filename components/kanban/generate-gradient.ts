export const generateColumnStyle = (index: number, total = 1) => {
    const intensity = 100 - (index / (total - 1)) * 50
    return { backgroundColor: `hsla(280, 52%, ${intensity}%, 30%)` }
}
