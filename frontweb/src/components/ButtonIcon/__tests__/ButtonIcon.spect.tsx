import { render, screen } from "@testing-library/react";
import ButtonIcon from "..";

test('ButtonIcon should render button with given text', () => {
//ARRANGE
//ACTION
//ASSERT

//ARRANGE to Text = FAZER LOGIN
const text = "Fazer login";

//ACTION
render(
    <ButtonIcon text = {text} />
)

//screen.debug();

//ASSERT
expect(screen.getByText(text)).toBeInTheDocument();
expect(screen.getByTestId("arrow")).toBeInTheDocument;


});