import Vue from 'vue'
import Vuetify from 'vuetify'
import SignIn from '../../../../src/components/authentication/signin/SignIn'
import { mount, createLocalVue } from '@vue/test-utils'

Vue.use(Vuetify)
const localVue = createLocalVue()

describe('SignIn', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(SignIn, {
      localVue
    })
  })

  it('should have enabled button if all input fields are ok ', async () => {
    // Arrange
    wrapper.find('[data-test="mailText"]').setValue('mail@mail.com')
    wrapper.find('[data-test="passwordText"]').setValue('password')

    // Act
    wrapper.vm.validate()
    await wrapper.vm.$nextTick()

    // Assert
    expect(wrapper.vm.userInfo.mail).toEqual('mail@mail.com')
    expect(wrapper.vm.userInfo.password).toEqual('password')
    expect(wrapper.find('[data-test="signin-button"]').attributes('disabled')).toBeUndefined()
    expect(wrapper.findAll('.v-messages__message').length).toBe(0)
  })

  it(
    'should display mail invalid message when mail is not conform', async () => {
      // Arrange
      wrapper.find('[data-test="mailText"]').setValue('mailmail.com')
      wrapper.find('[data-test="passwordText"]').setValue('password')

      // Act
      wrapper.vm.validate()
      await wrapper.vm.$nextTick()

      // Assert
      expect(wrapper.findAll('.v-messages__message').length).toBe(1)
      expect(wrapper.find('.v-messages__message').text()).toBe('E-mail must be valid')
    })

  it(
    'should display password invalid message when password is too short', async () => {
      // Arrange
      wrapper.find('[data-test="mailText"]').setValue('maqsdqsdqs@dqs.dom')
      wrapper.find('[data-test="passwordText"]').setValue('pas')

      // Act
      wrapper.vm.validate()
      await wrapper.vm.$nextTick()

      // Assert
      expect(wrapper.findAll('.v-messages__message').length).toBe(1)
      expect(wrapper.find('.v-messages__message').text()).toBe('At least 6 caracters, max 25')
    })

  it(
    'should display server error message and keep enabled button if server is unavailable', async () => {
      // Arrange
      const mockFn = jest.fn(() => {
        wrapper.vm.changeErrorState(true)
      })
      wrapper.vm.handleSubmit = mockFn
      wrapper.find('[data-test="mailText"]').setValue('maqsdqsd@dqs.dom')
      wrapper.find('[data-test="passwordText"]').setValue('password')

      // Act
      wrapper.vm.validate()
      await wrapper.find('[data-test="signin-form"]').trigger('submit')

      // Assert
      expect(mockFn).toHaveBeenCalled()
      expect(wrapper.find('.v-alert__content').text()).toBe('Oups... Désolé. Un problème technique est survenu, veuillez réessayer ultérieurement.')
      expect(wrapper.find('[data-test="signin-button"]').attributes('disabled')).toBeUndefined()
    })

  it(
    'should display request error message and disabled button if server answers 400', async () => {
      // Arrange
      const mockFn = jest.fn(() => {
        wrapper.vm.changeErrorState(false, 'Request error')
      })
      wrapper.vm.handleSubmit = mockFn
      wrapper.find('[data-test="mailText"]').setValue('maqsdqsd@dqs.dom')
      wrapper.find('[data-test="passwordText"]').setValue('password')

      // Act
      wrapper.vm.validate()
      await wrapper.find('[data-test="signin-form"]').trigger('submit')

      // Assert
      expect(mockFn).toHaveBeenCalled()
      expect(wrapper.find('.v-alert__content').text()).toBe('Request error')
      expect(wrapper.find('[data-test="signin-button"]').attributes('disabled')).toBe('disabled')
    })

  it(
    'should make request error message disappear when handleChange is called', async () => {
      // Arrange
      const mockFn = jest.fn(() => {
        wrapper.vm.changeErrorState(false, 'Request error')
      })
      wrapper.vm.handleSubmit = mockFn
      wrapper.find('[data-test="mailText"]').setValue('maqsdqsd@dqs.dom')
      wrapper.find('[data-test="passwordText"]').setValue('password')

      // Act
      wrapper.vm.validate()
      await wrapper.find('[data-test="signin-form"]').trigger('submit')
      expect(wrapper.find('.v-alert__content').text()).toBe('Request error')
      wrapper.vm.handleChange()
      await wrapper.vm.$nextTick()

      // Assert
      expect(wrapper.findAll('.v-alert__content').length).toBe(0)
    })
})
