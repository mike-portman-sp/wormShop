import { defineField, defineType } from "sanity";
import { SparkleIcon } from "@sanity/icons";


export default defineType({
  name: "button",
  type: "object",
  title: "Button Block",
  icon: SparkleIcon,
  preview: {
    select: {
      title: "title",
      style: "style",
    },
    prepare: ({ title, style }) => {
      return {
        title: `${title}`,
        subtitle: `${style}`,
      };
    },
  },
  groups: [
    {
      name: "basic",
      title: "Basic",
      default: true,
    },
    {
      name: "settings",
      title: "Settings",
    },
  ],
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      group: "basic",
    }),
    defineField({
      name: "link",
      type: "link",
      group: "basic",
    }),
    defineField({
      name: "style",
      type: "string",
      options: {
        list: [
          { title: "Sun", value: "btn--sun" },
          { title: "Outline Grey", value: "btn--outline-grey" },
          { title: "Plain Text", value: "btn--plain" },
          // { title: "Outline Blue", value: "btn--outline" },
          // { title: "Outline White", value: "btn--outline-alt" },
          // { title: "Arrow Blue", value: "btn--arrow" },
          // { title: "Arrow White", value: "btn--arrow-alt" },
        ],
      },
      initialValue: "btn--outline-grey",
      group: "basic",
      readOnly: (props) => props?.parent?.lockStyles,
    }),
    // defineField({ 
    //   title: "Custom Classes",
    //   name: "customClasses",
    //   type: "string",
    //   group: "settings",
    // }),
  ],
  options: {
    collapsible: true,
    collapsed: false,
  },
});
