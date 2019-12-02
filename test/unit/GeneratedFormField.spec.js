import { mount } from "@vue/test-utils"
import GeneratedFormField from "~/components/GeneratedFormField"

describe("Basic", () => {
  test("Mounts", () => {
    const wrapper = mount(GeneratedFormField, {
      propsData: {
        loading: false,
        field: {
          field: "name",
          label: "Name",
          component: "VTextField",
          outlined: true
        }
      }
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
