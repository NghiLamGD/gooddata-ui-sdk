// (C) 2021 GoodData Corporation

export interface IOffset {
    x?: number;
    y?: number;
}
declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        interface DraggedElement<Subject> extends Chainable<Subject> {
            /**
             * Used to drop the dragged element, works with `dragStart`
             */
            dragDrop: (dropSelector: string, offset?: IOffset) => Chainable<Subject>;
        }

        // eslint-disable-next-line @typescript-eslint/naming-convention
        interface Chainable<Subject> {
            /**
             * Drags element to offset position
             */
            dragByOffset: (offset: IOffset, metaKey: boolean, altKey: boolean) => Chainable<Subject>;

            /**
             * Drags element to position of drop element.
             */
            dragElementTo: (dragSelector: string, dropSelector: string, offset?: IOffset) => Chainable<void>;

            /**
             * Drags element to position of drop element.
             */
            dragTo: (dropSelector: string, offset?: IOffset) => Chainable<Subject>;

            /**
             * # DragStart
             *
             * `dragStart` is used when dragTo is not sufficient and drag needs to be split from `dragDrop` to insert wait or some other statement.
             *
             * ## Example
             * ```
             * cy.get(".selector")
             *   .dragStart()
             *   .wait(100)
             *   .dragDrop(".other-selector");
             * ```
             */
            dragStart: () => DraggedElement<Subject>;

            dragDrop: (dropSelector: string, offset?: IOffset) => Chainable<Subject>;
        }
    }
}

export default {};

function dragByOffset(dragElement: JQuery, offset: IOffset, metaKey: boolean, altKey: boolean) {
    const dropCoords = dragElement[0].getBoundingClientRect();

    const elementCenterH = dropCoords.height / 2;
    const elementCenterW = dropCoords.width / 2;

    const movePayload = {
        clientX: Math.trunc(dropCoords.x + elementCenterW + (offset?.x ?? 0)),
        clientY: Math.trunc(dropCoords.y + elementCenterH + (offset?.y ?? 0)),
    };

    return cy
        .wrap(dragElement)
        .trigger("mousedown", { button: 0, force: true, metaKey: metaKey, altKey: altKey }) // define button as which: 1 not working
        .trigger("mousemove", { button: 0 }) // We perform a small move event
        .trigger("mousemove", movePayload)
        .trigger("mousemove", { button: 0 }) // We perform a small move event
        .trigger("mouseup", { force: true });
}


function dragStart(dragElement: JQuery) {
    const dragCoords = dragElement[0].getBoundingClientRect();

    return cy
        .wrap(dragElement)
        .trigger("mousedown", { which: 1 })
        .trigger("mousemove", {
            which: 1,
            clientX: dragCoords.x + 10,
            clientY: dragCoords.y + 10,
            force: true,
        });
}

function dragDrop(draggedElement: JQuery, dropSelector: string, offset?: IOffset) {
    const dropElement = draggedElement[0].ownerDocument.querySelector(dropSelector);

    const dropCoords = dropElement.getBoundingClientRect();

    return cy
        .wrap(dropElement)
        .trigger("mousemove", {
            which: 1,
            clientX: dropCoords.x + (offset?.x ?? 0),
            clientY: dropCoords.y + (offset?.y ?? 0),
            force: true,
        })
        .trigger("mousemove", {
            which: 1,
            clientX: dropCoords.x + (offset?.x ?? 0) + 10,
            clientY: dropCoords.y + (offset?.y ?? 0) + 10,
            force: true,
        })
        .trigger("mouseup", { force: true });
}

function dragElementTo(dragElement: string, dropSelector: string, offset?: IOffset) {
    cy.get(dragElement).should("exist");
    return cy.wrap(dragElement).dragStart().dragDrop(dropSelector, offset);
}

Cypress.Commands.add(
    "dragByOffset",
    {
        prevSubject: true,
    },
    dragByOffset,
);

Cypress.Commands.add(
    "dragTo",
    {
        prevSubject: true,
    },
    dragElementTo,
);

Cypress.Commands.add("dragStart", { prevSubject: true }, dragStart);

Cypress.Commands.add("dragDrop", { prevSubject: true }, dragDrop);
