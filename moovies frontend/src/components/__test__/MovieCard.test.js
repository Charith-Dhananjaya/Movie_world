import {render, fireEvent, screen} from "@testing-library/react"

import MovieCard from "../MovieCard"

test('plus count', () => {
    render(<MovieCard />)

    const counter = screen.getByTestId('count');
    const plusBtn = screen.getByTestId('plus');

    fireEvent.click(plusBtn);

    expect(counter).toHaveContent('2');
})