import { describe, expect, it } from "vitest";
import {
    fireEvent,
    render,
    renderHook,
    screen,
    waitFor,
} from "@testing-library/react";
import App from "./App";
import useStatus from "./hooks/useStatus";
import Button from "./components/ui/button-test";
import AppProviders, { useUser } from "./providers/AppProvider";

describe("Component test", () => {
    it("should disabled button", async () => {
        render(<Button isDisabled={true}>Click me</Button>);
        const element = screen.getByText("Click me");
        fireEvent.click(element);
        expect(await screen.findByText("Click me")).toBeInTheDocument();
        expect(await screen.findByText("Click me")).toHaveAttribute("disabled");
    });

    it("should enabled button", async () => {
        render(<Button isDisabled={false}>Click me</Button>);
        const element = screen.getByText("Click me");
        fireEvent.click(element);
        expect(await screen.findByText("Click me")).toBeInTheDocument();
        expect(await screen.findByText("Click me")).not.toHaveAttribute(
            "disabled"
        );
    });
});

describe("Provider Test", () => {
    const ProviderTest = () => {
        const mockUser = {
            firstName: "John",
            lastName: "Doe",
        };
        const context = useUser();
        const { setUser, user } = context;

        return (
            <div>
                <p>{user?.firstName}</p>
                <button
                    onClick={() => {
                        setUser?.(mockUser);
                    }}
                >
                    Edit
                </button>
            </div>
        );
    };

    it("user edit should render", async () => {
        render(
            <AppProviders>
                <ProviderTest />
            </AppProviders>
        );

        const button = screen.getByText("Edit");
        waitFor(async () => fireEvent.click(button));
        expect(await screen.findByText("John")).toBeInTheDocument();
    });
});

describe("Hooks test", () => {
    it("should show Accepted", async () => {
        const hook = renderHook(() => useStatus({ status: "active" }));
        expect(hook.result.current.statusTag).toBe("Accepted");
    });

    it("should show Denied", async () => {
        const hook = renderHook(() => useStatus({ status: "rejected" }));
        expect(hook.result.current.statusTag).toBe("Denied");
    });
});

describe("Homepage test", () => {
    it("should render homepage", async () => {
        const document = render(<App />);
        expect(document).toBeDefined();
    });

    it("change to homepage", async () => {
        render(<App />);
        const element = screen.getByText("Home");
        fireEvent.click(element);
        expect(
            await screen.findByText("Welcome to the Weather App")
        ).toBeInTheDocument();
    });

    it("return to weather page", async () => {
        render(<App />);
        const element = screen.getByText("Weather");
        fireEvent.click(element);
        expect(await screen.findByText("Humidity")).toBeInTheDocument();
    });

    it("should render jakarta", async () => {
        render(<App />);
        const element = screen.getByTestId("search-bar");
        const button = screen.getByTestId("search-button");
        fireEvent.change(element, { target: { value: "jakarta" } });
        fireEvent.click(button);
        expect(await screen.findByText("Jakarta")).toBeInTheDocument();

        // Uncomment all the line below for debugging scenario
        // expect(await screen.findByText("29°")).toBeInTheDocument();
        // expect(await screen.findByText("79%")).toBeInTheDocument();
        // expect(await screen.findByText("1 km/h")).toBeInTheDocument();
    });
});
