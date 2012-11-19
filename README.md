# Separating DOM Concerns from Application Code

## Scope of DOM concerns

* Event handling ( DOM to App Code )
* Manipulating the DOM ( App Code to DOM )
* Reading User Input (Form Fields/DOM to App Code)

## Potential Approaches

* Backbone + Observer
* Plain Object, Monologue + Observer

## Example Project

A simple sign up form widget. The following should happen:

* The widget manages its own template file and renders it when needed
* The widget should support changing a password field into plain text, or back to a password field
* The widget should support submitting the data (somewhere)

## Notes

