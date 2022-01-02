// Code & Type definitions:
//
// This Source Code Form is subject to the terms of the Mozilla Public
// license, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
//
// Documentation:
//
// Documentation is modified from MDN and thus is under the CC BY-SA 2.5. You
// can find the license online at:
// https://creativecommons.org/licenses/by-sa/2.5/legalcode

interface EvListener<T extends Function> {
  /**
   * Adds a listener to this event.
   */
  addListener: (callback: T) => void

  /**
   * Stop listening to this event. The listener argument is the listener to remove
   */
  removeListener: (listener: T) => void

  /**
   * Check whether listener is registered for this event. Returns true if it is listening, false otherwise.
   */
  hasListener: (listener: T) => boolean
}

type Listener<T> = EvListener<(arg: T) => void>

/**
 * # JavaScript APIs
 *
 * JavaScript APIs for WebExtensions can be used inside the extension's [background scripts](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Anatomy_of_a_WebExtension#background_scripts) and in any other documents bundled with the extension, including [browser action](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/user_interface/Browser_action) or [page action](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/user_interface/Page_actions) popups, [sidebars](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/user_interface/Sidebars), [options pages](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/user_interface/Options_pages), or [new tab pages](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/chrome_url_overrides). A few of these APIs can also be accessed by an extension's [content scripts](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Anatomy_of_a_WebExtension#content_scripts). (See the [list in the content script guide](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_scripts#webextension_apis).)
 *
 * To use the more powerful APIs, you need to [request permission](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/permissions) in your extension's `manifest.json`.
 *
 * You can access the APIs using the `browser` namespace:
 *
 * ```js
 * function logTabs(tabs) {
 *   console.log(tabs)
 * }
 *
 * browser.tabs.query({currentWindow: true}, logTabs)
 * ```
 * ## [Browser API differences](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API#browser_api_differences "Permalink to Browser API differences")
 *
 * Note that this is different from Google Chrome's extension system, which uses the `chrome` namespace instead of `browser`, and which uses callbacks instead of promises for asynchronous functions. As a porting aid, the Firefox implementation of WebExtensions APIs supports `chrome` and callbacks as well as `browser` and promises. Mozilla has also written a polyfill which enables code that uses `browser` and promises to work unchanged in Chrome: [https://github.com/mozilla/webextension-polyfill](https://github.com/mozilla/webextension-polyfill).
 *
 * Firefox also implements these APIs under the `chrome` namespace using callbacks. This allows code written for Chrome to run largely unchanged in Firefox for the APIs documented here.
 *
 * Microsoft Edge uses the `browser` namespace, but doesn't yet support promise-based asynchronous APIs. In Edge, for the time being, asynchronous APIs must use callbacks.
 *
 * Not all browsers support all the APIs: for the details, see [Browser support for JavaScript APIs](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Browser_support_for_JavaScript_APIs) and [Chrome incompatibilities](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Chrome_incompatibilities).
 *
 * ## [Examples](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API#examples "Permalink to Examples")
 *
 * Throughout the JavaScript API listings, you will find short code examples that illustrate how the API is used. You can experiment using these examples—_without_ needing to create a web extension—using the console in the [Toolbox](https://extensionworkshop.com/documentation/develop/debugging/#developer-tools-toolbox).
 *
 * For example, here is the first code example on this page running in the Toolbox console in Firefox Developer Edition:
 */
declare namespace browser {
  /**
   * **Warning:** If you use `contextMenus`, you must have the `contextMenus`
   * permission, but if you use `menus`, you must have the `menus` permission.
   * Both apis are otherwise identical
   *
   * Alias to `browser.menus`. Prefer to use that over `contextMenus` for firefox
   * webextentions in the future.
   *
   *
   * @permission contextMenus
   * @deprecated
   */
  export import contextMenus = browser.menus

  /**
   * Schedule code to run at a specific time in the future. This is like [`setTimeout()`](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout) and [`setInterval()`](https://developer.mozilla.org/en-US/docs/Web/API/setInterval), except that those functions don't work with background pages that are loaded on demand.
   *
   * Alarms do not persist across browser sessions. They are created globally across all contexts of a single extension. E.g. alarm created in background script will fire [`onAlarm`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/alarms/onAlarm) event in background script, options page, popup page and extension tabs (and vice versa). Alarms API is not available in [`Content scripts`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_scripts#webextension_apis).
   *
   * To use this API you need to have the "alarms" [permission](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/permissions).
   *
   * Docs collected from: https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/alarms
   *
   * @permission alarms
   */
  export namespace alarms {
    /**
     * Information about a single alarm. This object is returned from [`alarms.get()`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/alarms/get) and [`alarms.getAll()`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/alarms/getAll), and is passed into the [`alarms.onAlarm`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/alarms/onAlarm) listener.
     *
     * Docs collected from: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/alarms/Alarm
     *
     * @permission alarms
     */
    type Alarm = {
      name: string
      scheduledTime: number
      periodInMinutes?: number
    }

    /**
     * You can use this to specify when the alarm will initially fire, either as an absolute value (`when`), or as a delay from the time the alarm is set (`delayInMinutes`). To make the alarm recur, specify `periodInMinutes`.
     *
     * Docs collected from: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/alarms/create
     *
     * @permission alarms
     */
    type When = {
      /**
       * The time the alarm will fire first, given as [milliseconds since the epoch](https://en.wikipedia.org/wiki/Unix_time). To get the number of milliseconds between the epoch and the current time, use [`Date.now()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now). If you specify `when`, don't specify `delayInMinutes`.
       */
      when: number
      /**
       * If this is specified, the alarm will fire again every `periodInMinutes` after its initial firing. If you specify this value you may omit both `when` and `delayInMinutes`, and the alarm will then fire initially after `periodInMinutes`. If `periodInMinutes` is not specified, the alarm will only fire once.
       */
      periodInMinutes?: number
    }
    /**
     * You can use this to specify when the alarm will initially fire, either as an absolute value (`when`), or as a delay from the time the alarm is set (`delayInMinutes`). To make the alarm recur, specify `periodInMinutes`.
     *
     * Docs collected from: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/alarms/create
     *
     * @permission alarms
     */
    type DelayInMinutes = {
      /**
       * The time the alarm will fire first, given as minutes from the time the alarm is set. If you specify `delayInMinutes`, don't specify `when`.
       */
      delayInMinutes: number
      /**
       * If this is specified, the alarm will fire again every `periodInMinutes` after its initial firing. If you specify this value you may omit both `when` and `delayInMinutes`, and the alarm will then fire initially after `periodInMinutes`. If `periodInMinutes` is not specified, the alarm will only fire once.
       */
      periodInMinutes?: number
    }

    /**
     * A name for the alarm. Defaults to the empty string.
     *
     * This can be used to refer to a particular alarm in [`alarms.get()`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/alarms/get) and [`alarms.clear()`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/alarms/clear). It will also be available in [`alarms.onAlarm`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/alarms/onAlarm) as the `name` property of the [`alarms.Alarm`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/alarms/Alarm) object passed into the listener function.
     *
     * Alarm names are unique within the scope of a single extension. If an alarm with an identical name exists, the existing alarm will be cleared and the alarm being created will replace it.
     *
     * @param name This can be used to refer to a particular alarm in [`alarms.get()`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/alarms/get) and [`alarms.clear()`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/alarms/clear). It will also be available in [`alarms.onAlarm`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/alarms/onAlarm) as the `name` property of the [`alarms.Alarm`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/alarms/Alarm) object passed into the listener function. Alarm names are unique within the scope of a single extension. If an alarm with an identical name exists, the existing alarm will be cleared and the alarm being created will replace it.
     * @param alarmInfo You can use this to specify when the alarm will initially fire, either as an absolute value (`when`), or as a delay from the time the alarm is set (`delayInMinutes`). To make the alarm recur, specify `periodInMinutes`.
     *
     * @permission alarms
     */
    function create(name?: string, alarmInfo?: When | DelayInMinutes): void

    /**
     * Gets an alarm, given its name. This is an asynchronous function that returns a [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
     * @param name The name of the alarm to get. If you don't supply this, the empty string "" will be used.
     * @returns A [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) that will be fulfilled with an ``[`Alarm`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/alarms/Alarm)`` object. This represents the alarm whose name matches `name`. If no alarms match, this will be `undefined`.
     *
     * @permission alarms
     */
    function get(name?: string): Promise<Alarm | undefined>

    /**
     * Gets all active alarms for the extension. This is an asynchronous function that returns a [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
     * @returns A [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) that will be fulfilled with an array of [`Alarm`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/alarms/Alarm "Information about a single alarm. This object is returned from alarms.get() and alarms.getAll(), and is passed into the alarms.onAlarm listener.") objects. Each of these represents an active alarm that belongs to the extension. If no alarms are active, the array will be empty.
     *
     * @permission alarms
     */
    function getAll(): Promise<Alarm[]>

    /**
     * Cancels an alarm, given its name. This is an asynchronous function that returns a [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
     * @param name The name of the alarm to clear. If you don't supply this, the empty string "" will be used.
     * @returns A [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) that will be fulfilled with a boolean. This will be `true` if the alarm was cleared, `false` otherwise.
     *
     * @permission alarms
     */
    function clear(name?: string): Promise<boolean>

    /**
     * Cancels all active alarms. This is an asynchronous function that returns a [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
     * @returns A [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) that will be fulfilled with a boolean. This will be `true` if any alarms were cleared, `false` otherwise.
     *
     * @permission alarms
     */
    function clearAll(): Promise<boolean>

    /**
     * Fired when any alarm set by the extension goes off.
     *
     * @permission alarms
     */
    const onAlarm: Listener<Alarm>
  }

  export namespace bookmarks {
    type BookmarkTreeNodeUnmodifiable = 'managed'
    type BookmarkTreeNodeType = 'bookmark' | 'folder' | 'separator'
    type BookmarkTreeNode = {
      id: string
      parentId?: string
      index?: number
      url?: string
      title: string
      dateAdded?: number
      dateGroupModified?: number
      unmodifiable?: BookmarkTreeNodeUnmodifiable
      children?: BookmarkTreeNode[]
      type?: BookmarkTreeNodeType
    }

    type CreateDetails = {
      parentId?: string
      index?: number
      title?: string
      type?: BookmarkTreeNodeType
      url?: string
    }

    function create(bookmark: CreateDetails): Promise<BookmarkTreeNode>
    function get(idOrIdList: string | string[]): Promise<BookmarkTreeNode[]>
    function getChildren(id: string): Promise<BookmarkTreeNode[]>
    function getRecent(numberOfItems: number): Promise<BookmarkTreeNode[]>
    function getSubTree(id: string): Promise<[BookmarkTreeNode]>
    function getTree(): Promise<[BookmarkTreeNode]>

    type Destination =
      | {
          parentId: string
          index?: number
        }
      | {
          index: number
          parentId?: string
        }
    function move(
      id: string,
      destination: Destination
    ): Promise<BookmarkTreeNode>
    function remove(id: string): Promise<void>
    function removeTree(id: string): Promise<void>
    function search(
      query:
        | string
        | {
            query?: string
            url?: string
            title?: string
          }
    ): Promise<BookmarkTreeNode[]>
    function update(
      id: string,
      changes: { title: string; url: string }
    ): Promise<BookmarkTreeNode>

    const onCreated: EvListener<
      (id: string, bookmark: BookmarkTreeNode) => void
    >
    const onRemoved: EvListener<
      (
        id: string,
        removeInfo: {
          parentId: string
          index: number
          node: BookmarkTreeNode
        }
      ) => void
    >
    const onChanged: EvListener<
      (
        id: string,
        changeInfo: {
          title: string
          url?: string
        }
      ) => void
    >
    const onMoved: EvListener<
      (
        id: string,
        moveInfo: {
          parentId: string
          index: number
          oldParentId: string
          oldIndex: number
        }
      ) => void
    >
  }

  export namespace browserAction {
    type ColorArray = [number, number, number, number]
    type ImageDataType = ImageData

    function setTitle(details: { title: string | null; tabId?: number }): void
    function getTitle(details: { tabId?: number }): Promise<string>

    type IconViaPath = {
      path: string | { [size: number]: string }
      tabId?: number
    }

    type IconViaImageData = {
      imageData: ImageDataType | { [size: number]: ImageDataType }
      tabId?: number
    }

    type IconReset = {
      imageData?: {} | null
      path?: {} | null
      tabId?: number
    }

    function setIcon(
      details: IconViaPath | IconViaImageData | IconReset
    ): Promise<void>
    function setPopup(details: { popup: string | null; tabId?: number }): void
    function getPopup(details: { tabId?: number }): Promise<string>
    function openPopup(): Promise<void>
    function setBadgeText(details: {
      text: string | null
      tabId?: number
    }): void
    function getBadgeText(details: { tabId?: number }): Promise<string>
    function setBadgeBackgroundColor(details: {
      color: string | ColorArray | null
      tabId?: number
    }): void
    function getBadgeBackgroundColor(details: {
      tabId?: number
    }): Promise<ColorArray>
    function setBadgeTextColor(details: {
      color: string | ColorArray
      tabId?: number
    }): void
    function setBadgeTextColor(details: {
      color: string | ColorArray
      windowId?: number
    }): void
    function setBadgeTextColor(details: { color: null; tabId?: number }): void
    function getBadgeTextColor(details: { tabId?: string }): Promise<ColorArray>
    function getBadgeTextColor(details: {
      windowId?: string
    }): Promise<ColorArray>
    function enable(tabId?: number): void
    function disable(tabId?: number): void

    const onClicked: Listener<browser.tabs.Tab>
  }

  export namespace browsingData {
    type DataTypeSet = {
      cache?: boolean
      cookies?: boolean
      downloads?: boolean
      fileSystems?: boolean
      formData?: boolean
      history?: boolean
      indexedDB?: boolean
      localStorage?: boolean
      passwords?: boolean
      pluginData?: boolean
      serverBoundCertificates?: boolean
      serviceWorkers?: boolean
    }

    type DataRemovalOptions = {
      since?: number
      originTypes?: { unprotectedWeb: boolean }
    }

    type ExtraDataRemovalOptions = {
      hostnames?: string[]
    }

    function remove(
      removalOptions: DataRemovalOptions,
      dataTypes: DataTypeSet
    ): Promise<void>
    function removeCache(removalOptions?: DataRemovalOptions): Promise<void>
    function removeCookies(
      removalOptions: DataRemovalOptions & ExtraDataRemovalOptions
    ): Promise<void>
    function removeLocalStorage(
      removalOptions: DataRemovalOptions & ExtraDataRemovalOptions
    ): Promise<void>
    function removeDownloads(removalOptions: DataRemovalOptions): Promise<void>
    function removeFormData(removalOptions: DataRemovalOptions): Promise<void>
    function removeHistory(removalOptions: DataRemovalOptions): Promise<void>
    function removePasswords(removalOptions: DataRemovalOptions): Promise<void>
    function removePluginData(removalOptions: DataRemovalOptions): Promise<void>
    function settings(): Promise<{
      options: DataRemovalOptions
      dataToRemove: DataTypeSet
      dataRemovalPermitted: DataTypeSet
    }>
  }

  export namespace commands {
    type Command = {
      name?: string
      description?: string
      shortcut?: string
    }

    function getAll(): Promise<Command[]>

    const onCommand: Listener<string>
  }

  /**
   * # menus
   *
   * Add items to the browser's menu system.
   *
   * This API is modeled on Chrome's ["contextMenus"](https://developer.chrome.com/extensions/contextMenus) API, which enables Chrome extensions to add items to the browser's context menu. The `browser.menus` API adds a few features to Chrome's API.
   *
   * Before Firefox 55 this API was also originally named `contextMenus`, and that name has been retained as an alias, so you can use `contextMenus` to write code that works in Firefox and also in other browsers.
   *
   * To use this API you need to have the `menus`  [permission](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/permissions). You may also use the `contextMenus` alias instead of `menus`, but if you do, the APIs must be accessed as `browser.contextMenus` instead.
   *
   * Except for [`menus.getTargetElement()`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/menus/getTargetElement), this API cannot be used from content scripts.
   *
   * ## [Creating menu items](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/menus#creating_menu_items "Permalink to Creating menu items")
   *
   * To create a menu item call the [`menus.create()`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/menus/create) method. You pass this method an object containing options for the item, including the item ID, item type, and the contexts in which it should be shown.
   *
   * Listen for clicks on your menu item by adding a listener to the [`menus.onClicked`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/menus/onClicked) event. This listener will be passed a [`menus.OnClickData`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/menus/OnClickData) object containing the event's details.
   *
   * You can create four different types of menu item, based on the value of the `type` property you supply in the options to `create()`:
   *
   * -   "normal": a menu item that just displays a label
   * -   "checkbox": a menu item that represents a binary state. It displays a checkmark next to the label. Clicking the item toggles the checkmark. The click listener will be passed two extra properties: "checked", indicating whether the item is checked now, and "wasChecked", indicating whether the item was checked before the click event.
   * -   "radio": a menu item that represents one of a group of choices. Just like a checkbox, this also displays a checkmark next to the label, and its click listener is passed "checked" and "wasChecked". However, if you create more than one radio item, then the items function as a group of radio items: only one item in the group can be checked, and clicking an item makes it the checked item.
   * -   "separator": a line separating a group of items.
   *
   * If you have created more than one context menu item or more than one tools menu item, then the items will be placed in a submenu. The submenu's parent will be labeled with the name of the extension. For example, here's an extension called "Menu demo" that's added two context menu items:
   *
   * ![](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/menus/menus-1.png)
   *
   * ## [Icons](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/menus#icons "Permalink to Icons")
   *
   * If you've specified icons for your extension using the ["icons" manifest key](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/icons), your menu item will display the specified icon next to its label. The browser will try to choose a 16x16 pixel icon for a normal display or a 32x32 pixel icon for a high-density display:
   *
   * ![](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/menus/menus-2.png)
   *
   * Only for items in a submenu, you can specify custom icons by passing the `icons` option to [`menus.create()`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/menus/create):
   *
   * ![](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/menus/menus-3.png)
   *
   * ## [Example](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/menus#example "Permalink to Example")
   *
   * Here's a context menu containing 4 items: a normal item, two radio items with separators on each side, and a checkbox. The radio items are given custom icons.
   *
   * ![](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/menus/menus-4.png)You could create a submenu like this using code like:
   *
   * ```js
   * browser.menus.create({
   *   id: "remove-me",
   *   title: browser.i18n.getMessage("menuItemRemoveMe"),
   *   contexts: ["all"]
   * }, onCreated);
   *
   * browser.menus.create({
   *   id: "separator-1",
   *   type: "separator",
   *   contexts: ["all"]
   * }, onCreated);
   *
   * browser.menus.create({
   *   id: "greenify",
   *   type: "radio",
   *   title: browser.i18n.getMessage("menuItemGreenify"),
   *   contexts: ["all"],
   *   checked: true,
   *   icons: {
   *     "16": "icons/paint-green-16.png",
   *     "32": "icons/paint-green-32.png"
   *   }
   * }, onCreated);
   *
   * browser.menus.create({
   *   id: "bluify",
   *   type: "radio",
   *   title: browser.i18n.getMessage("menuItemBluify"),
   *   contexts: ["all"],
   *   checked: false,
   *   icons: {
   *     "16": "icons/paint-blue-16.png",
   *     "32": "icons/paint-blue-32.png"
   *   }
   * }, onCreated);
   *
   * browser.menus.create({
   *   id: "separator-2",
   *   type: "separator",
   *   contexts: ["all"]
   * }, onCreated);
   *
   * var checkedState = true;
   *
   * browser.menus.create({
   *   id: "check-uncheck",
   *   type: "checkbox",
   *   title: browser.i18n.getMessage("menuItemUncheckMe"),
   *   contexts: ["all"],
   *   checked: checkedState
   * }, onCreated);
   * ```
   *
   * @permission menus
   */
  export namespace menus {
    /**
     * The different contexts a menu item can appear in. Values of this type are strings. The item is displayed when the given context applies. Possible values are:
     *
     * ## [Type](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/menus/ContextType#browser_compatibility#type "Permalink to Type")
     *
     * Values of this type are strings. The item is displayed when the given context applies. Possible values are:
     *
     *  - `all`:Specifying 'all' is equivalent to the combination of all other contexts except for 'bookmark', 'tab' and 'tools\_menu'.
     *
     *  - `audio`: Applies when the user context-clicks an [audio](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio) element.
     *
     *  - `bookmark`: Applies when the user context-clicks a bookmark item in the bookmarks toolbar, bookmarks menu, bookmarks sidebar (`Ctrl + B`) and the Library window (`Ctrl + Shift + B`). The latter two are supported as of Firefox 66. Requires the "bookmarks" [API permission](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/permissions#api_permissions) in the manifest.
     *
     *  - `browser_action`: Applies when the user context-clicks your browser action. The maximum number of items that can be added to the top-level browser action context menu is [`menus.ACTION_MENU_TOP_LEVEL_LIMIT`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/menus/ACTION_MENU_TOP_LEVEL_LIMIT), but you can add any number of items to submenus.
     *
     *  - `editable`: Applies when the user context-clicks an editable element, like a [textarea](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea).
     *
     *  - `frame`: Applies when the user context-clicks in a nested [iframe](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe).
     *
     *  - `image`: Applies when the user context-clicks an image.
     *
     *  - `link`: Applies when the user context-clicks on a link.
     *
     *  - `page`: Applies when the user context-clicks in the page, but none of the other page contexts apply (for example, the click is not on an image or a nested iframe or a link).
     *
     *  - `page_action`: Applies when the user context-clicks your page action. The maximum number of items that can be added to the top-level page action context menu is [`menus.ACTION_MENU_TOP_LEVEL_LIMIT`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/menus/ACTION_MENU_TOP_LEVEL_LIMIT), but you can add any number of items to submenus.
     *
     *  - `password`: Applies when the user context-clicks on a [password input element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/password).
     *
     *  - `selection`: Applies when part of the page is selected.
     *
     *  - `tab`: Applies when the user context-clicks on a tab (specifically, this refers to the tab-strip or other user interface element enabling the user to switch from one browser tab to another, not to the page itself). From Firefox 63, clicking the menu item on a tab grants the [activeTab](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/permissions#activetab_permission) permission for the tab clicked, even if that isn't the currently active tab.
     *
     *  - `tools_menu`: The item will be added to the browser's tools menu. Note that this is only available if you access `ContextType` through the `menus` namespace. It is not available if you access it through the `contextMenus` namespace.
     *
     *  - `video`: Applies when the user context-clicks a [video](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video) element.
     *
     * Note that "launcher" is not supported.
     *
     * @permission menus
     */
    type ContextType =
      | 'all'
      | 'audio'
      | 'bookmarks'
      | 'browser_action'
      | 'editable'
      | 'frame'
      | 'image'
      // Launcher is not supported by firefox
      // | 'launcher'
      | 'link'
      | 'page'
      | 'page_action'
      | 'password'
      | 'selection'
      | 'tab'
      | 'tools_menu'
      | 'video'

    /**
     * The type of menu item. Values of this type are strings. Possible values are:
     *
     * - `normal`: A menu item that just displays a label.
     *
     * - `checkbox`: menu item that represents a binary state. It displays a checkmark next to the label. Clicking the item toggles the checkmark. The [`menus.onClicked`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/menus/onClicked) listener will be passed two extra properties: "checked", indicating whether the item is checked now, and "wasChecked", indicating whether the item was checked before the click event.
     *
     * - `radio`: A menu item that represents one of a group of choices. Just like a checkbox, this also displays a checkmark next to the label, and its [`menus.onClicked`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/menus/onClicked) listener is passed "checked" and "wasChecked". However, if you create more than one radio item, then the items function as a group of radio items: only one item in the group can be checked, and clicking an item makes it the checked item.
     *
     * - `separator`: A line separating a group of items.
     */
    type ItemType = 'normal' | 'checkbox' | 'radio' | 'separator'

    /**
     * Information passed to the [`menus.onClicked`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/menus/onClicked) event listener when a menu item is clicked.
     */
    type OnClickData = {
      /**
       * The ID of the bookmark where the context menu was clicked.
       */
      bookmarkId?: string
      /**
       * Which mouse button was pressed. The values are the same as for [`MouseEvent.button`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button).
       */
      button?: number

      /**
       * A flag indicating whether a checkbox or radio item was checked after it was clicked.
       */
      checked?: boolean

      /**
       * A flag indicating whether the element is editable: for example, if it is a [textarea](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea).
       */
      editable: boolean

      /**
       * The ID of the frame in which the item was clicked. The frame ID can be used in other APIs that accept frame IDs, such as [`tabs.sendMessage()`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/sendMessage). If the item was clicked in the top level document, `frameId` is zero. If the item was clicked outside the page entirely (for example, in the `tools_menu` or `tab` context), then `frameId` is `undefined`.
       */
      frameId?: number

      /**
       * The ID of the frame in which the item was clicked. The frame ID can be used in other APIs that accept frame IDs, such as [`tabs.sendMessage()`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/sendMessage). If the item was clicked in the top level document, `frameId` is zero. If the item was clicked outside the page entirely (for example, in the `tools_menu` or `tab` context), then `frameId` is `undefined`.
       */
      frameUrl?: string

      /**
       * If the element is a link, the text for the link. If the link contains no text, the URL itself is given here.
       */
      linkText?: string

      /**
       * If the element is a link, the URL it points to.
       */
      linkUrl?: string

      /**
       * One of "image", "video", or "audio" if the context menu was activated on one of these types of elements.
       */
      mediaType?: string

      /**
       * The ID of the menu item that was clicked
       */
      menuItemId: number | string

      /**
       * An array containing any modifier keys that were pressed when the item was clicked. Possible values are: "Alt", "Command", "Ctrl", "MacCtrl", and "Shift". On a Mac, if the user has the Control key pressed, then both "Ctrl" and "MacCtrl" are included.
       */
      modifiers: string[]

      /**
       * The URL of the page in which the menu item was clicked. This property is not present if the click occurred in a context where there is no current page, such as on a browser action.
       */
      pageUrl?: string

      /**
       * The parent ID, if any, for the item clicked.
       */
      parentMenuItemId?: number | string

      /**
       * If some text was selected in the page, this contains the selected text.
       */
      selectionText?: string

      /**
       * If present, the `src` value for the media in the clicked element.
       */
      srcUrl?: string

      /**
       * An identifier of the element, if any, over which the context menu was created. Use [`menus.getTargetElement()`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/menus/getTargetElement) in the content script to locate the element. Note that this is not the [id](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id) attribute of the page element.
       */
      targetElementId?: number

      /**
       * The type of extension view.
       */
      viewType?: browser.extension.ViewType

      /**
       * A flag indicating whether a checkbox or radio item was checked before it was clicked.
       */
      wasChecked?: boolean
    }

    /**
     * The maximum number of top level extension items that can be added to a menu item whose [`ContextType`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/menus/ContextType) is "browser\_action" or "page\_action". Any items beyond this limit will be ignored.
     *
     * Its value is `6` on Firefox and Chrome.
     *
     * For compatibility with other browsers, Firefox makes this property available via the `contextMenus` namespace as well as the `menus` namespace.
     */
    const ACTION_MENU_TOP_LEVEL_LIMIT: number

    /**
     * Creates a new menu item, given an options object defining properties for the item.
     *
     * Unlike other asynchronous functions, this one does not return a promise, but uses an optional callback to communicate success or failure. This is because its return value is the ID of the new item.
     *
     * For compatibility with other browsers, Firefox makes this method available via the `contextMenus` namespace as well as the `menus` namespace. Note though that it's not possible to create tools menu items (`contexts: ["tools_menu"]`) using the `contextMenus` namespace.
     *
     * @param createProperties Properties for the new menu item.
     * @param callback Called when the item has been created. If there were any problems creating the item, details will be available in [`runtime.lastError`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/lastError).
     */
    function create(
      createProperties: {
        /**
         * The initial state of a checkbox or radio item: `true` for selected and `false` for unselected. Only one radio item can be selected at a time in a given group of radio items.
         */
        checked?: boolean
        /**
         * String describing an action that should be taken when the user clicks the item. Possible values are:
         *
         * -   `"_execute_browser_action"`: simulate a click on the extension's browser action, opening its popup if it has one
         * -   `"_execute_page_action"`: simulate a click on the extension's page action, opening its popup if it has one
         * -   `"_execute_sidebar_action"`: open the extension's sidebar
         *
         * Clicking the item will still trigger the [`menus.onClicked`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/menus/onClicked) event, but there's no guarantee of the ordering here: the command may be executed before `onClicked` fires.
         */
        command?:
          | '_execute_browser_action'
          | '_execute_page_action'
          | '_execute_sidebar_action'

        /**
         * Array of contexts in which this menu item will appear. If this option is omitted:
         *
         * -   if the item's parent has contexts set, then this item will inherit its parent's contexts
         * -   otherwise, the item is given a context array of \["page"\].
         */
        contexts?: ContextType[]

        /**
         * Lets you restrict the item to apply only to documents whose URL matches one of the given [match patterns](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Match_patterns). This applies to frames as well.
         */
        documentUrlPatterns?: string[]

        /**
         * Whether this menu item is enabled or disabled. Defaults to `true`.
         */
        enabled?: boolean

        /**
         * One or more custom icons to display next to the item. Custom icons can only be set for items appearing in submenus. This property is an object with one property for each supplied icon: the property's name should include the icon's size in pixels, and path is relative to the icon from the extension's root directory. The browser tries to choose a 16x16 pixel icon for a normal display or a 32x32 pixel icon for a high-density display. To avoid any scaling, you can specify icons like this:
         *
         * ```json
         * "icons": {
         *         "16": "path/to/geo-16.png",
         *         "32": "path/to/geo-32.png"
         *       }
         * ```
         *
         * One or more custom icons to display next to the item. Custom icons can only be set for items appearing in submenus. This property is an object with one property for each supplied icon: the property's name should include the icon's size in pixels, and path is relative to the icon from the extension's root directory. The browser tries to choose a 16x16 pixel icon for a normal display or a 32x32 pixel icon for a high-density display. To avoid any scaling, you can specify icons like this:
         *
         * ```json
         * "icons": {
         *         "16": "path/to/geo-16.png",
         *         "32": "path/to/geo-32.png"
         *       }
         * ```
         *
         * One or more custom icons to display next to the item. Custom icons can only be set for items appearing in submenus. This property is an object with one property for each supplied icon: the property's name should include the icon's size in pixels, and path is relative to the icon from the extension's root directory. The browser tries to choose a 16x16 pixel icon for a normal display or a 32x32 pixel icon for a high-density display. To avoid any scaling, you can specify icons like this:
         *
         * ```json
         * "icons": {
         *         "16": "path/to/geo-16.png",
         *         "32": "path/to/geo-32.png"
         *       }
         * ```
         */
        icons?: Record<string, string>

        /**
         * The unique ID to assign to this item. Mandatory for event pages. Cannot be the same as another ID for this extension.
         */
        id?: string

        /**
         * A function that will be called when the menu item is clicked. Event pages cannot use this: instead, they should register a listener for [`menus.onClicked`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/menus/onClicked).
         */
        onclick?: (info: OnClickData, tab: browser.tabs.Tab) => void

        /**
         * The ID of a parent menu item; this makes the item a child of a previously added item. Note: If you have created more than one menu item, then the items will be placed in a submenu. The submenu's parent will be labeled with the name of the extension.
         */
        parentId?: number | string

        /**
         * Similar to `documentUrlPatterns`, but lets you filter based on the `href` of anchor tags and the `src` attribute of img/audio/video tags. This parameter supports any URL scheme, even those that are usually not allowed in a match pattern.
         */
        targetUrlPatterns?: string[]

        /**
         * The text to be displayed in the item. Mandatory unless `type` is "separator".
         *
         * You can use "`%s`" in the string. If you do this in a menu item, and some text is selected in the page when the menu is shown, then the selected text will be interpolated into the title. For example, if `title` is "Translate '%s' to Pig Latin" and the user selects the word "cool", then activates the menu, then the menu item's title will be: "Translate 'cool' to Pig Latin".
         *
         * If the title contains an ampersand "&" then the next character will be used as an access key for the item, and the ampersand will not be displayed. Exceptions to this are:
         *
         * -   If the next character is also an ampersand: then a single ampersand will be displayed and no access key will be set. In effect, "&&" is used to display a single ampersand.
         * -   If the next characters are the interpolation directive "%s": then the ampersand will not be displayed and no access key will be set.
         * -   If the ampersand is the last character in the title: then the ampersand will not be displayed and no access key will be set.
         *
         * Only the first ampersand will be used to set an access key: subsequent ampersands will not be displayed but will not set keys. So "&A and &B" will be shown as "A and B" and set "A" as the access key.
         *
         * In some localized versions of Firefox (Japanese and Chinese), the access key is surrounded by parentheses and appended to the menu label, _unless_ the menu title itself already ends with the access key (`"toolkit(&K)"` for example). For more details, see [bug 1647373](https://bugzilla.mozilla.org/show_bug.cgi?id=1647373).
         */
        title?: string

        /**
         * The type of menu item: "normal", "checkbox", "radio", "separator". Defaults to "normal".
         */
        type?: ItemType

        /**
         * List of view types where the menu item will be shown. Defaults to any view, including those without a `viewType`
         */
        viewTypes?: browser.extension.ViewType[]

        /**
         * Whether the item is shown in the menu. Defaults to `true`.
         */
        visible?: boolean
      },
      callback?: () => void
    ): number | string

    /**
     * # menus.getTargetElement()
     *
     * Returns the element for a given `targetElementId`
     *
     * This method is available to all extension script contexts (content scripts, background pages and other extension pages) and returns the element for a given `info.targetElementId`, provided that the element still exists in the document where the method is invoked.
     *
     * The method only works in the document that includes the right-clicked element and the `targetElementId` expires when the user opens another context menu.
     *
     * **Note:** `menus.getTargetElement` only return the requested element if called in the same context as the document that contains the element, for example using content scripts (as shown in the example below).
     *
     * An extension requires the "menus" permission to use this API.
     *
     * ## [Syntax](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/menus/getTargetElement#syntax "Permalink to Syntax")
     *
     * ```js
     * let elem = browser.menus.getTargetElement(targetElementId);
     * ```
     * @param targetElementId The property of the ``[`menus.OnClickData`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/menus/OnClickData)`` object passed to the ``[`menus.onClicked`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/menus/onClicked)`` handler or ``[`menus.onShown`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/menus/onShown)`` event.
     * @returns The element referred to by the `targetElementId` parameter. If the `targetElementId` parameter is not valid, the method returns `null`
     */
    function getTargetElement(targetElementId: number): object | null

    /**
     * Hide all default Firefox menu items in favor of providing a custom context menu UI.
     *
     * The overrideContext method will cause the matching menu items from this extension to be shown instead of the default menu. This method should be called from a `[contextmenu](https://developer.mozilla.org/en-US/docs/Web/API/Element/contextmenu_event "/en-US/docs/Web/Events/contextmenu")` DOM event handler, and only applies to the menu that opens after this event.
     *
     * This interface requires the `menus.overrideContext` [permission](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/permissions).
     *
     * ## [Examples](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/menus/overrideContext#examples "Permalink to Examples")
     *
     * Open the tab context menu on your custom UI, in this case :
     *
     * ```
     * document.addEventListener('contextmenu', event => {
     *   const foo = event.target.closest('.foo');
     *   if (foo) {
     *     // When the context menu is opened on an element with the foo class
     *     // set the context to "opening a tab context menu".
     *     browser.menus.overrideContext({
     *       context: 'tab',
     *       tabId: parseInt(foo.dataset.tabId)
     *     });
     *   }
     * }, { capture: true });
     * ```
     * See [this blog post](https://blog.mozilla.org/addons/2018/11/08/extensions-in-firefox-64/#cm) for more details.
     *
     * @param contextOptions Options for how the context menus will be overridden.
     */
    function overrideContext(
      contextOptions: Partial<{
        /**
         * Whether to also include default menu items in the menu
         */
        showDefaults: boolean
        /**
         * ContextType to override, to allow menu items from other extensions in the menu. Currently only `'bookmark'` and `'tab'` are supported. `showDefaults` cannot be used with this option.
         */
        context: string
        /**
         * Required when context is `'bookmark'`. Requires 'bookmark' permission.
         */
        bookmarkId: string
        /**
         * Required when context is 'tab'. Requires 'tabs' permission.
         */
        tabId: number
      }>
    ): void

    /**
     * Refreshes a menu that's being shown.
     *
     * Updates the extension's menu items in the menu that the browser is currently showing, including changes that have been made since the menu was shown. Has no effect if the menu is not being shown. Rebuilding a shown menu is an expensive operation, only invoke this method when necessary.
     *
     * This would typically be called from inside a [`menus.onShown`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/menus/onShown) event handler, after the handler has made any updates to the menu.
     *
     * Firefox makes this function available via the `contextMenus` namespace as well as the `menus` namespace.
     *
     * This is an asynchronous function that returns a [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
     */
    function refresh(): Promise<void>

    /**
     * Removes a menu item.
     *
     * For compatibility with other browsers, Firefox makes this method available via the `contextMenus` namespace as well as the `menus` namespace.
     *
     * This is an asynchronous function that returns a [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
     *
     * ## [Syntax](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/menus/remove#syntax "Permalink to Syntax")
     *
     * ```
     * var removing = browser.menus.remove(
     *   menuItemId      // integer or string
     * )
     * ```
     *
     * Removes a menu item.
     *
     * For compatibility with other browsers, Firefox makes this method available via the `contextMenus` namespace as well as the `menus` namespace.
     *
     * This is an asynchronous function that returns a [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
     *
     * ## [Syntax](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/menus/remove#syntax "Permalink to Syntax")
     *
     * ```
     * var removing = browser.menus.remove(
     *   menuItemId      // integer or string
     * )
     * ```
     * @param menuItemId The ID of the menu item to remove.
     * @returns A [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) that will be fulfilled with no arguments if removal was successful, or rejected with an error message if removal failed (for example, because the item could not be found).
     */
    function remove(menuItemId: number | string): Promise<void>

    /**
     * Removes all menu items added by the extension.
     *
     * For compatibility with other browsers, Firefox makes this method available via the `contextMenus` namespace as well as the `menus` namespace.
     *
     * This is an asynchronous function that returns a [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
     *
     * @returns A [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) that will be fulfilled with no arguments when all items have been removed.
     */
    function removeAll(): Promise<void>

    /**
     * Updates a previously created menu item.
     *
     * For compatibility with other browsers, Firefox makes this method available via the `contextMenus` namespace as well as the `menus` namespace.
     *
     * This is an asynchronous function that returns a [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
     *
     * ## [Syntax](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/menus/update#syntax "Permalink to Syntax")
     *
     * ```js
     * var updating = browser.menus.update(
     *   id,               // integer or string
     *   updateProperties // object
     * )
     * ```
     *
     * @param id The ID of the item to update.
     * @param updateProperties The properties to update. The same as the `createProperties` object passed to [`menus.create()`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/menus/create), except that `id` can't be set. In addition, `icons` can only be changed on menu commands, not on the top-level context menu. The top-level icon matches the extension's primary icon as declared in the extension's manifest file.
     */
    function update(
      id: number | string,
      updateProperties: {
        /**
         * The initial state of a checkbox or radio item: `true` for selected and `false` for unselected. Only one radio item can be selected at a time in a given group of radio items.
         */
        checked?: boolean

        /**
         * String describing an action that should be taken when the user clicks the item. Possible values are:
         *
         * -   `"_execute_browser_action"`: simulate a click on the extension's browser action, opening its popup if it has one
         * -   `"_execute_page_action"`: simulate a click on the extension's page action, opening its popup if it has one
         * -   `"_execute_sidebar_action"`: open the extension's sidebar
         *
         * Clicking the item will still trigger the [`menus.onClicked`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/menus/onClicked) event, but there's no guarantee of the ordering here: the command may be executed before `onClicked` fires.
         */
        command?:
          | '_execute_browser_action'
          | '_execute_page_action'
          | '_execute_sidebar_action'

        /**
         * Array of contexts in which this menu item will appear. If this option is omitted:
         *
         * -   if the item's parent has contexts set, then this item will inherit its parent's contexts
         * -   otherwise, the item is given a context array of \["page"\].
         */
        contexts?: ContextType[]

        /**
         * Lets you restrict the item to apply only to documents whose URL matches one of the given [match patterns](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Match_patterns). This applies to frames as well.
         */
        documentUrlPatterns?: string[]

        /**
         * Whether this menu item is enabled or disabled. Defaults to `true`.
         */
        enabled?: boolean

        /**
         * One or more custom icons to display next to the item. Custom icons can only be set for items appearing in submenus. This property is an object with one property for each supplied icon: the property's name should include the icon's size in pixels, and path is relative to the icon from the extension's root directory. The browser tries to choose a 16x16 pixel icon for a normal display or a 32x32 pixel icon for a high-density display. To avoid any scaling, you can specify icons like this:
         *
         * ```json
         * "icons": {
         *       "16": "path/to/geo-16.png",
         *       "32": "path/to/geo-32.png"
         *     }
         * ```
         *
         * One or more custom icons to display next to the item. Custom icons can only be set for items appearing in submenus. This property is an object with one property for each supplied icon: the property's name should include the icon's size in pixels, and path is relative to the icon from the extension's root directory. The browser tries to choose a 16x16 pixel icon for a normal display or a 32x32 pixel icon for a high-density display. To avoid any scaling, you can specify icons like this:
         *
         * ```json
         * "icons": {
         *       "16": "path/to/geo-16.png",
         *       "32": "path/to/geo-32.png"
         *     }
         * ```
         *
         * One or more custom icons to display next to the item. Custom icons can only be set for items appearing in submenus. This property is an object with one property for each supplied icon: the property's name should include the icon's size in pixels, and path is relative to the icon from the extension's root directory. The browser tries to choose a 16x16 pixel icon for a normal display or a 32x32 pixel icon for a high-density display. To avoid any scaling, you can specify icons like this:
         *
         * ```json
         * "icons": {
         *       "16": "path/to/geo-16.png",
         *       "32": "path/to/geo-32.png"
         *     }
         * ```
         */
        icons: Record<string, string>

        /**
         * The unique ID to assign to this item. Mandatory for event pages. Cannot be the same as another ID for this extension.
         */
        id: string

        /**
         * A function that will be called when the menu item is clicked. Event pages cannot use this: instead, they should register a listener for [`menus.onClicked`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/menus/onClicked).
         */
        onclick?: (info: OnClickData, tab: browser.tabs.Tab) => void

        /**
         * The ID of a parent menu item; this makes the item a child of a previously added item. Note: If you have created more than one menu item, then the items will be placed in a submenu. The submenu's parent will be labeled with the name of the extension.
         */
        parentId?: number | string

        /**
         * Similar to documentUrlPatterns, but lets you filter based on the href of anchor tags and the src attribute of img/audio/video tags. This parameter supports any URL scheme, even those that are usually not allowed in a match pattern.
         */
        targetUrlPatterns?: string[]

        /**
         * The text to be displayed in the item. Mandatory unless `type` is "separator".
         *
         * You can use "`%s`" in the string. If you do this in a menu item, and some text is selected in the page when the menu is shown, then the selected text will be interpolated into the title. For example, if `title` is "Translate '%s' to Pig Latin" and the user selects the word "cool", then activates the menu, then the menu item's title will be: "Translate 'cool' to Pig Latin".
         *
         * If the title contains an ampersand "&" then the next character will be used as an access key for the item, and the ampersand will not be displayed. Exceptions to this are:
         *
         * -   If the next character is also an ampersand: then a single ampersand will be displayed and no access key will be set. In effect, "&&" is used to display a single ampersand.
         * -   If the next characters are the interpolation directive "%s": then the ampersand will not be displayed and no access key will be set.
         * -   If the ampersand is the last character in the title: then the ampersand will not be displayed and no access key will be set.
         *
         * Only the first ampersand will be used to set an access key: subsequent ampersands will not be displayed but will not set keys. So "&A and &B" will be shown as "A and B" and set "A" as the access key.
         */
        title?: string

        /**
         * The type of menu item: "normal", "checkbox", "radio", "separator". Defaults to "normal".
         */
        type?: ItemType

        /**
         * List of view types where the menu item will be shown. Defaults to any view, including those without a `viewType`.
         */
        viewType?: browser.extension.ViewType[]

        /**
         * Whether the item is shown in the menu. Defaults to `true`.
         */
        visible?: boolean
      }
    ): Promise<void>

    /**
     * # menus.onClicked
     *
     * Fired when a menu item is clicked.
     *
     * For compatibility with other browsers, Firefox makes this event available via the `contextMenus` namespace as well as the `menus` namespace.
     *
     * ## [Syntax](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/menus/onClicked#syntax "Permalink to Syntax")
     *
     * ```js
     * browser.menus.onClicked.addListener(listener)
     * browser.menus.onClicked.removeListener(listener)
     * browser.menus.onClicked.hasListener(listener)
     * ```
     *
     * ## Params
     * - `info`: Information about the item clicked and the context where the click happened.
     * - `tab`: The details of the tab where the click took place. If the click did not take place in or on a tab, this parameter will be missing.
     */
    const onClicked: EvListener<
      (info: OnClickData, tab: browser.tabs.Tab) => void
    >

    /**
     * # menus.onHidden
     *
     * Fired when the browser stops displaying a menu: for example because the user clicked outside it or selected an item.
     *
     * It is only triggered for menus that can be manipulated using the [`menus`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/menus) API itself: this includes the context menu, the browser's tools menu, and the bookmarks menu.
     *
     * This is most likely to be used in combination with the [`menus.onShown`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/menus/onShown) and [`menus.refresh()`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/menus/refresh) APIs: an extension can update the menu when it is shown, then undo the changes when it is hidden.
     *
     * Firefox makes this event available via the `contextMenus` namespace as well as the `menus` namespace.
     */
    const onHidden: EvListener<() => void>

    /**
     * # menus.onShown
     *
     * Fired when the browser has shown a menu.
     *
     * An extension can use this event to update its menu items using information that's only available once the menu is shown. Typically an extension will figure out the update in its `onShown` handler and then call [`menus.refresh()`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/menus/refresh) to update the menu itself.
     *
     * The handler can add, remove, or update menu items.
     *
     * For example, the [menu-labelled-open](https://github.com/mdn/webextensions-examples/tree/master/menu-labelled-open) example extension adds a menu item that's shown when the user clicks a link, and that, when clicked, just opens the link. It uses `onShown` and `refresh()` to annotate the menu item with the hostname for the link, so the user can easily see where they will go before they click.
     *
     * Note that an extension should not take too much time before calling `refresh()`, or the update will be noticeable to the user.
     *
     * The handler is passed some information about the menu and its contents, and some information from the page (such as the link and/or selection text). To get access to the information from the page, your extension must have the [host permission](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/permissions#host_permissions) for it.
     *
     * If the `onShown` handler calls any asynchronous APIs, then it's possible that the menu has been closed again before the handler resumes execution. Because of this, if a handler calls any asynchronous APIs, it should check that the menu is still being displayed before it updates the menu. For example:
     *
     * ```
     * var lastMenuInstanceId = 0;
     * var nextMenuInstanceId = 1;
     *
     * browser.menus.onShown.addListener(async function(info, tab) {
     *   var menuInstanceId = nextMenuInstanceId++;
     *   lastMenuInstanceId = menuInstanceId;
     *
     *   // Call an async function
     *   await .... ;
     *
     *   // After completing the async operation, check whether the menu is still shown.
     *   if (menuInstanceId !== lastMenuInstanceId) {
     *     return; // Menu was closed and shown again.
     *   }
     *   // Now use menus.create/update + menus.refresh.
     * });
     *
     * browser.menus.onHidden.addListener(function() {
     *   lastMenuInstanceId = 0;
     * });
     * ```
     *
     * # menus.onShown
     *
     * Fired when the browser has shown a menu.
     *
     * An extension can use this event to update its menu items using information that's only available once the menu is shown. Typically an extension will figure out the update in its `onShown` handler and then call [`menus.refresh()`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/menus/refresh) to update the menu itself.
     *
     * The handler can add, remove, or update menu items.
     *
     * For example, the [menu-labelled-open](https://github.com/mdn/webextensions-examples/tree/master/menu-labelled-open) example extension adds a menu item that's shown when the user clicks a link, and that, when clicked, just opens the link. It uses `onShown` and `refresh()` to annotate the menu item with the hostname for the link, so the user can easily see where they will go before they click.
     *
     * Note that an extension should not take too much time before calling `refresh()`, or the update will be noticeable to the user.
     *
     * The handler is passed some information about the menu and its contents, and some information from the page (such as the link and/or selection text). To get access to the information from the page, your extension must have the [host permission](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/permissions#host_permissions) for it.
     *
     * If the `onShown` handler calls any asynchronous APIs, then it's possible that the menu has been closed again before the handler resumes execution. Because of this, if a handler calls any asynchronous APIs, it should check that the menu is still being displayed before it updates the menu. For example:
     *
     * ```
     * var lastMenuInstanceId = 0;
     * var nextMenuInstanceId = 1;
     *
     * browser.menus.onShown.addListener(async function(info, tab) {
     *   var menuInstanceId = nextMenuInstanceId++;
     *   lastMenuInstanceId = menuInstanceId;
     *
     *   // Call an async function
     *   await .... ;
     *
     *   // After completing the async operation, check whether the menu is still shown.
     *   if (menuInstanceId !== lastMenuInstanceId) {
     *     return; // Menu was closed and shown again.
     *   }
     *   // Now use menus.create/update + menus.refresh.
     * });
     *
     * browser.menus.onHidden.addListener(function() {
     *   lastMenuInstanceId = 0;
     * });
     * ```
     *
     * # menus.onShown
     *
     * Fired when the browser has shown a menu.
     *
     * An extension can use this event to update its menu items using information that's only available once the menu is shown. Typically an extension will figure out the update in its `onShown` handler and then call [`menus.refresh()`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/menus/refresh) to update the menu itself.
     *
     * The handler can add, remove, or update menu items.
     *
     * For example, the [menu-labelled-open](https://github.com/mdn/webextensions-examples/tree/master/menu-labelled-open) example extension adds a menu item that's shown when the user clicks a link, and that, when clicked, just opens the link. It uses `onShown` and `refresh()` to annotate the menu item with the hostname for the link, so the user can easily see where they will go before they click.
     *
     * Note that an extension should not take too much time before calling `refresh()`, or the update will be noticeable to the user.
     *
     * The handler is passed some information about the menu and its contents, and some information from the page (such as the link and/or selection text). To get access to the information from the page, your extension must have the [host permission](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/permissions#host_permissions) for it.
     *
     * If the `onShown` handler calls any asynchronous APIs, then it's possible that the menu has been closed again before the handler resumes execution. Because of this, if a handler calls any asynchronous APIs, it should check that the menu is still being displayed before it updates the menu. For example:
     *
     * ```
     * var lastMenuInstanceId = 0;
     * var nextMenuInstanceId = 1;
     *
     * browser.menus.onShown.addListener(async function(info, tab) {
     *   var menuInstanceId = nextMenuInstanceId++;
     *   lastMenuInstanceId = menuInstanceId;
     *
     *   // Call an async function
     *   await .... ;
     *
     *   // After completing the async operation, check whether the menu is still shown.
     *   if (menuInstanceId !== lastMenuInstanceId) {
     *     return; // Menu was closed and shown again.
     *   }
     *   // Now use menus.create/update + menus.refresh.
     * });
     *
     * browser.menus.onHidden.addListener(function() {
     *   lastMenuInstanceId = 0;
     * });
     * ```
     *
     * # menus.onShown
     *
     * Fired when the browser has shown a menu.
     *
     * An extension can use this event to update its menu items using information that's only available once the menu is shown. Typically an extension will figure out the update in its `onShown` handler and then call [`menus.refresh()`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/menus/refresh) to update the menu itself.
     *
     * The handler can add, remove, or update menu items.
     *
     * For example, the [menu-labelled-open](https://github.com/mdn/webextensions-examples/tree/master/menu-labelled-open) example extension adds a menu item that's shown when the user clicks a link, and that, when clicked, just opens the link. It uses `onShown` and `refresh()` to annotate the menu item with the hostname for the link, so the user can easily see where they will go before they click.
     *
     * Note that an extension should not take too much time before calling `refresh()`, or the update will be noticeable to the user.
     *
     * The handler is passed some information about the menu and its contents, and some information from the page (such as the link and/or selection text). To get access to the information from the page, your extension must have the [host permission](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/permissions#host_permissions) for it.
     *
     * If the `onShown` handler calls any asynchronous APIs, then it's possible that the menu has been closed again before the handler resumes execution. Because of this, if a handler calls any asynchronous APIs, it should check that the menu is still being displayed before it updates the menu. For example:
     *
     * ```
     * var lastMenuInstanceId = 0;
     * var nextMenuInstanceId = 1;
     *
     * browser.menus.onShown.addListener(async function(info, tab) {
     *   var menuInstanceId = nextMenuInstanceId++;
     *   lastMenuInstanceId = menuInstanceId;
     *
     *   // Call an async function
     *   await .... ;
     *
     *   // After completing the async operation, check whether the menu is still shown.
     *   if (menuInstanceId !== lastMenuInstanceId) {
     *     return; // Menu was closed and shown again.
     *   }
     *   // Now use menus.create/update + menus.refresh.
     * });
     *
     * browser.menus.onHidden.addListener(function() {
     *   lastMenuInstanceId = 0;
     * });
     * ```
     *
     * @param info
     *
     * This is just like the [`menus.OnClickData`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/menus/OnClickData) object, except it contains two extra properties:
     *
     * -   `contexts`: an array of all the [`contexts`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/menus/ContextType) that are applicable to this menu.
     * -   `menuIds`: an array of IDs of all menu items belonging to this extension that are being shown in this menu.
     *
     * Compared with `menus.OnClickData`, the `info` object also omits the `menuItemId` and `modifiers` properties, because of course these are not available until a menu item has been selected.
     *
     * The `contexts`, `menuIds`, `frameId`, and `editable` properties are always provided. All the other properties in `info` are only provided if the extension has the [host permission](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/permissions#host_permissions) for the page.
     *
     * @param tab The details of the tab where the click took place. If the click did not take place in or on a tab, this parameter will be missing.
     */
    const onShown: EvListener<
      (info: OnClickData, tab: browser.tabs.Tab) => void
    >
  }

  export namespace contextualIdentities {
    type IdentityColor =
      | 'blue'
      | 'turquoise'
      | 'green'
      | 'yellow'
      | 'orange'
      | 'red'
      | 'pink'
      | 'purple'
    type IdentityIcon =
      | 'fingerprint'
      | 'briefcase'
      | 'dollar'
      | 'cart'
      | 'circle'

    type ContextualIdentity = {
      cookieStoreId: string
      color: IdentityColor
      icon: IdentityIcon
      name: string
    }

    function create(details: {
      name: string
      color: IdentityColor
      icon: IdentityIcon
    }): Promise<ContextualIdentity>
    function get(cookieStoreId: string): Promise<ContextualIdentity | null>
    function query(details: { name?: string }): Promise<ContextualIdentity[]>
    function update(
      cookieStoreId: string,
      details: {
        name: string
        color: IdentityColor
        icon: IdentityIcon
      }
    ): Promise<ContextualIdentity>
    function remove(cookieStoreId: string): Promise<ContextualIdentity | null>
  }

  export namespace cookies {
    type Cookie = {
      name: string
      value: string
      domain: string
      hostOnly: boolean
      path: string
      secure: boolean
      httpOnly: boolean
      session: boolean
      firstPartyDomain?: string
      sameSite: SameSiteStatus
      expirationDate?: number
      storeId: string
    }

    type CookieStore = {
      id: string
      incognito: boolean
      tabIds: number[]
    }

    type SameSiteStatus = 'no_restriction' | 'lax' | 'strict'

    type OnChangedCause =
      | 'evicted'
      | 'expired'
      | 'explicit'
      | 'expired_overwrite'
      | 'overwrite'

    function get(details: {
      url: string
      name: string
      storeId?: string
      firstPartyDomain?: string
    }): Promise<Cookie | null>
    function getAll(details: {
      url?: string
      name?: string
      domain?: string
      path?: string
      secure?: boolean
      session?: boolean
      storeId?: string
      firstPartyDomain?: string
    }): Promise<Cookie[]>
    function set(details: {
      domain?: string
      expirationDate?: number
      firstPartyDomain?: string
      httpOnly?: boolean
      name?: string
      path?: string
      sameSite?: SameSiteStatus
      secure?: boolean
      storeId?: string
      url: string
      value?: string
    }): Promise<Cookie>
    function remove(details: {
      url: string
      name: string
      storeId?: string
      firstPartyDomain?: string
    }): Promise<Cookie | null>
    function getAllCookieStores(): Promise<CookieStore[]>

    const onChanged: Listener<{
      removed: boolean
      cookie: Cookie
      cause: OnChangedCause
    }>
  }

  export namespace contentScripts {
    type RegisteredContentScriptOptions = {
      allFrames?: boolean
      css?: ({ file: string } | { code: string })[]
      excludeGlobs?: string[]
      excludeMatches?: string[]
      includeGlobs?: string[]
      js?: ({ file: string } | { code: string })[]
      matchAboutBlank?: boolean
      matches: string[]
      runAt?: 'document_start' | 'document_end' | 'document_idle'
    }

    type RegisteredContentScript = {
      unregister: () => void
    }

    function register(
      contentScriptOptions: RegisteredContentScriptOptions
    ): Promise<RegisteredContentScript>
  }

  export namespace devtools.inspectedWindow {
    const tabId: number

    function eval(
      expression: string
    ): Promise<
      [
        any,

        (
          | { isException: boolean; value: string }
          | { isError: boolean; code: string }
        )
      ]
    >

    function reload(reloadOptions?: {
      ignoreCache?: boolean
      userAgent?: string
      injectedScript?: string
    }): void
  }

  export namespace devtools.network {
    const onNavigated: Listener<string>
  }

  export namespace devtools.panels {
    type ExtensionPanel = {
      onShown: Listener<Window>
      onHidden: Listener<void>
    }

    function create(
      title: string,
      iconPath: string,
      pagePath: string
    ): Promise<ExtensionPanel>
  }

  export namespace downloads {
    type FilenameConflictAction = 'uniquify' | 'overwrite' | 'prompt'

    type InterruptReason =
      | 'FILE_FAILED'
      | 'FILE_ACCESS_DENIED'
      | 'FILE_NO_SPACE'
      | 'FILE_NAME_TOO_LONG'
      | 'FILE_TOO_LARGE'
      | 'FILE_VIRUS_INFECTED'
      | 'FILE_TRANSIENT_ERROR'
      | 'FILE_BLOCKED'
      | 'FILE_SECURITY_CHECK_FAILED'
      | 'FILE_TOO_SHORT'
      | 'NETWORK_FAILED'
      | 'NETWORK_TIMEOUT'
      | 'NETWORK_DISCONNECTED'
      | 'NETWORK_SERVER_DOWN'
      | 'NETWORK_INVALID_REQUEST'
      | 'SERVER_FAILED'
      | 'SERVER_NO_RANGE'
      | 'SERVER_BAD_CONTENT'
      | 'SERVER_UNAUTHORIZED'
      | 'SERVER_CERT_PROBLEM'
      | 'SERVER_FORBIDDEN'
      | 'USER_CANCELED'
      | 'USER_SHUTDOWN'
      | 'CRASH'

    type DangerType =
      | 'file'
      | 'url'
      | 'content'
      | 'uncommon'
      | 'host'
      | 'unwanted'
      | 'safe'
      | 'accepted'

    type State = 'in_progress' | 'interrupted' | 'complete'

    type DownloadItem = {
      id: number
      url: string
      referrer: string
      filename: string
      incognito: boolean
      danger: string
      mime: string
      startTime: string
      endTime?: string
      estimatedEndTime?: string
      state: string
      paused: boolean
      canResume: boolean
      error?: string
      bytesReceived: number
      totalBytes: number
      fileSize: number
      exists: boolean
      byExtensionId?: string
      byExtensionName?: string
    }

    type Delta<T> = {
      current?: T
      previous?: T
    }

    type StringDelta = Delta<string>
    type DoubleDelta = Delta<number>
    type BooleanDelta = Delta<boolean>
    type DownloadTime = Date | string | number

    type DownloadQuery = {
      query?: string[]
      startedBefore?: DownloadTime
      startedAfter?: DownloadTime
      endedBefore?: DownloadTime
      endedAfter?: DownloadTime
      totalBytesGreater?: number
      totalBytesLess?: number
      filenameRegex?: string
      urlRegex?: string
      limit?: number
      orderBy?: string
      id?: number
      url?: string
      filename?: string
      danger?: DangerType
      mime?: string
      startTime?: string
      endTime?: string
      state?: State
      paused?: boolean
      error?: InterruptReason
      bytesReceived?: number
      totalBytes?: number
      fileSize?: number
      exists?: boolean
    }

    function download(options: {
      url: string
      filename?: string
      conflictAction?: string
      saveAs?: boolean
      method?: string
      headers?: { [key: string]: string }
      body?: string
    }): Promise<number>
    function search(query: DownloadQuery): Promise<DownloadItem[]>
    function pause(downloadId: number): Promise<void>
    function resume(downloadId: number): Promise<void>
    function cancel(downloadId: number): Promise<void>
    // unsupported: function getFileIcon(downloadId: number, options?: { size?: number }):
    //              Promise<string>;
    function open(downloadId: number): Promise<void>
    function show(downloadId: number): Promise<void>
    function showDefaultFolder(): void
    function erase(query: DownloadQuery): Promise<number[]>
    function removeFile(downloadId: number): Promise<void>
    // unsupported: function acceptDanger(downloadId: number): Promise<void>;
    // unsupported: function drag(downloadId: number): Promise<void>;
    // unsupported: function setShelfEnabled(enabled: boolean): void;

    const onCreated: Listener<DownloadItem>
    const onErased: Listener<number>
    const onChanged: Listener<{
      id: number
      url?: StringDelta
      filename?: StringDelta
      danger?: StringDelta
      mime?: StringDelta
      startTime?: StringDelta
      endTime?: StringDelta
      state?: StringDelta
      canResume?: BooleanDelta
      paused?: BooleanDelta
      error?: StringDelta
      totalBytes?: DoubleDelta
      fileSize?: DoubleDelta
      exists?: BooleanDelta
    }>
  }

  export namespace events {
    type UrlFilter = {
      hostContains?: string
      hostEquals?: string
      hostPrefix?: string
      hostSuffix?: string
      pathContains?: string
      pathEquals?: string
      pathPrefix?: string
      pathSuffix?: string
      queryContains?: string
      queryEquals?: string
      queryPrefix?: string
      querySuffix?: string
      urlContains?: string
      urlEquals?: string
      urlMatches?: string
      originAndPathMatches?: string
      urlPrefix?: string
      urlSuffix?: string
      schemes?: string[]
      ports?: Array<number | number[]>
    }
  }

  export namespace extension {
    /**
     * The type of extension view.
     *
     * **Warning:** Webkit-based browsers do not conform to standards and do not
     * implement `sidebar`.
     */
    type ViewType = 'tab' | 'notification' | 'popup' | 'sidebar'

    const lastError: string | null
    const inIncognitoContext: boolean

    function getURL(path: string): string
    function getViews(fetchProperties?: {
      type?: ViewType
      windowId?: number
    }): Window[]
    function getBackgroundPage(): Window
    function isAllowedIncognitoAccess(): Promise<boolean>
    function isAllowedFileSchemeAccess(): Promise<boolean>
    // unsupported: events as they are deprecated
  }

  export namespace extensionTypes {
    type ImageFormat = 'jpeg' | 'png'
    type ImageDetails = {
      format: ImageFormat
      quality: number
    }
    type RunAt = 'document_start' | 'document_end' | 'document_idle'
    type InjectDetails = {
      allFrames?: boolean
      code?: string
      file?: string
      frameId?: number
      matchAboutBlank?: boolean
      runAt?: RunAt
    }
    type InjectDetailsCSS = InjectDetails & { cssOrigin?: 'user' | 'author' }
  }

  export namespace find {
    type FindOptions = {
      tabid: number
      caseSensitive: boolean
      entireWord: boolean
      includeRangeData: boolean
      includeRectData: boolean
    }

    type FindResults = {
      count: number
      rangeData?: RangeData[]
      rectData?: RectData[]
    }

    type RangeData = {
      framePos: number
      startTextNodePos: number
      endTextNodePos: number
      startOffset: number
      endOffset: number
      text: string
    }

    type RectData = {
      rectsAndTexts: RectsAndTexts
      text: string
    }

    type RectsAndTexts = {
      rectList: RectItem[]
      textList: string[]
    }

    type RectItem = {
      top: number
      left: number
      bottom: number
      right: number
    }

    function find(query: string, object?: FindOptions): Promise<FindResults>
    function highlightResults(): void
    function removeHighlighting(): void
  }

  export namespace history {
    type TransitionType =
      | 'link'
      | 'typed'
      | 'auto_bookmark'
      | 'auto_subframe'
      | 'manual_subframe'
      | 'generated'
      | 'auto_toplevel'
      | 'form_submit'
      | 'reload'
      | 'keyword'
      | 'keyword_generated'

    type HistoryItem = {
      id: string
      url?: string
      title?: string
      lastVisitTime?: number
      visitCount?: number
      typedCount?: number
    }

    type VisitItem = {
      id: string
      visitId: string
      visitTime?: number
      refferingVisitId: string
      transition: TransitionType
    }

    function search(query: {
      text: string
      startTime?: number | string | Date
      endTime?: number | string | Date
      maxResults?: number
    }): Promise<HistoryItem[]>

    function getVisits(details: { url: string }): Promise<VisitItem[]>

    function addUrl(details: {
      url: string
      title?: string
      transition?: TransitionType
      visitTime?: number | string | Date
    }): Promise<void>

    function deleteUrl(details: { url: string }): Promise<void>

    function deleteRange(range: {
      startTime: number | string | Date
      endTime: number | string | Date
    }): Promise<void>

    function deleteAll(): Promise<void>

    const onVisited: Listener<HistoryItem>

    // TODO: Ensure that urls is not `urls: [string]` instead
    const onVisitRemoved: Listener<{ allHistory: boolean; urls: string[] }>
  }

  export namespace i18n {
    type LanguageCode = string

    function getAcceptLanguages(): Promise<LanguageCode[]>

    function getMessage(
      messageName: string,
      substitutions?: string | string[]
    ): string

    function getUILanguage(): LanguageCode

    function detectLanguage(text: string): Promise<{
      isReliable: boolean
      languages: { language: LanguageCode; percentage: number }[]
    }>
  }

  export namespace identity {
    function getRedirectURL(): string
    function launchWebAuthFlow(details: {
      url: string
      interactive: boolean
    }): Promise<string>
  }

  export namespace idle {
    type IdleState = 'active' | 'idle' /* unsupported: | "locked" */

    function queryState(detectionIntervalInSeconds: number): Promise<IdleState>
    function setDetectionInterval(intervalInSeconds: number): void

    const onStateChanged: Listener<IdleState>
  }

  export namespace management {
    type ExtensionInfo = {
      description: string
      // unsupported: disabledReason: string,
      enabled: boolean
      homepageUrl: string
      hostPermissions: string[]
      icons: { size: number; url: string }[]
      id: string
      installType: 'admin' | 'development' | 'normal' | 'sideload' | 'other'
      mayDisable: boolean
      name: string
      // unsupported: offlineEnabled: boolean,
      optionsUrl: string
      permissions: string[]
      shortName: string
      // unsupported: type: string,
      updateUrl: string
      version: string
      // unsupported: versionName: string,
    }

    function getSelf(): Promise<ExtensionInfo>
    function uninstallSelf(options: {
      showConfirmDialog: boolean
      dialogMessage: string
    }): Promise<void>
  }

  export namespace notifications {
    type TemplateType = 'basic' /* | "image" | "list" | "progress" */

    type NotificationOptions = {
      type: TemplateType
      message: string
      title: string
      iconUrl?: string
    }

    function create(
      id: string | null,
      options: NotificationOptions
    ): Promise<string>
    function create(options: NotificationOptions): Promise<string>

    function clear(id: string): Promise<boolean>

    function getAll(): Promise<{ [key: string]: NotificationOptions }>

    const onClosed: Listener<string>

    const onClicked: Listener<string>
  }

  export namespace omnibox {
    type OnInputEnteredDisposition =
      | 'currentTab'
      | 'newForegroundTab'
      | 'newBackgroundTab'
    type SuggestResult = {
      content: string
      description: string
    }

    function setDefaultSuggestion(suggestion: { description: string }): void

    const onInputStarted: Listener<void>
    const onInputChanged: EvListener<
      (text: string, suggest: (arg: SuggestResult[]) => void) => void
    >
    const onInputEntered: EvListener<
      (text: string, disposition: OnInputEnteredDisposition) => void
    >
    const onInputCancelled: Listener<void>
  }

  export namespace pageAction {
    type ImageDataType = ImageData

    function show(tabId: number): void

    function hide(tabId: number): void

    function setTitle(details: { tabId: number; title: string }): void

    function getTitle(details: { tabId: number }): Promise<string>

    function setIcon(details: {
      tabId: number
      path?: string | object
      imageData?: ImageDataType
    }): Promise<void>

    function setPopup(details: { tabId: number; popup: string }): void

    function getPopup(details: { tabId: number }): Promise<string>

    const onClicked: Listener<browser.tabs.Tab>
  }

  export namespace permissions {
    type Permission =
      | 'activeTab'
      | 'alarms'
      | 'background'
      | 'bookmarks'
      | 'browsingData'
      | 'browserSettings'
      | 'clipboardRead'
      | 'clipboardWrite'
      | 'contextMenus'
      | 'contextualIdentities'
      | 'cookies'
      | 'downloads'
      | 'downloads.open'
      | 'find'
      | 'geolocation'
      | 'history'
      | 'identity'
      | 'idle'
      | 'management'
      | 'menus'
      | 'nativeMessaging'
      | 'notifications'
      | 'pkcs11'
      | 'privacy'
      | 'proxy'
      | 'sessions'
      | 'storage'
      | 'tabs'
      | 'theme'
      | 'topSites'
      | 'unlimitedStorage'
      | 'webNavigation'
      | 'webRequest'
      | 'webRequestBlocking'

    type Permissions = {
      origins?: string[]
      permissions?: Permission[]
    }

    function contains(permissions: Permissions): Promise<boolean>

    function getAll(): Promise<Permissions>

    function remove(permissions: Permissions): Promise<boolean>

    function request(permissions: Permissions): Promise<boolean>

    // Not yet support in Edge and Firefox:
    // const onAdded: Listener<Permissions>;
    // const onRemoved: Listener<Permissions>;
  }

  export namespace runtime {
    const lastError: string | null
    const id: string

    type Port = {
      name: string
      disconnect(): void
      error: object
      onDisconnect: Listener<Port>
      onMessage: Listener<object>
      postMessage: <T = object>(message: T) => void
      sender?: runtime.MessageSender
    }

    type MessageSender = {
      tab?: browser.tabs.Tab
      frameId?: number
      id?: string
      url?: string
      tlsChannelId?: string
    }

    type PlatformOs = 'mac' | 'win' | 'android' | 'cros' | 'linux' | 'openbsd'
    type PlatformArch = 'arm' | 'x86-32' | 'x86-64'
    type PlatformNaclArch = 'arm' | 'x86-32' | 'x86-64'

    type PlatformInfo = {
      os: PlatformOs
      arch: PlatformArch
    }

    // type RequestUpdateCheckStatus = "throttled" | "no_update" | "update_available";
    type OnInstalledReason =
      | 'install'
      | 'update'
      | 'chrome_update'
      | 'shared_module_update'
    type OnRestartRequiredReason = 'app_update' | 'os_update' | 'periodic'

    type FirefoxSpecificProperties = {
      id?: string
      strict_min_version?: string
      strict_max_version?: string
      update_url?: string
    }

    type IconPath = { [urlName: string]: string } | string

    type Manifest = {
      // Required
      manifest_version: 2
      name: string
      version: string
      /** Required in Microsoft Edge */
      author?: string

      // Optional

      // ManifestBase
      description?: string
      homepage_url?: string
      short_name?: string

      // WebExtensionManifest
      background?: {
        page: string
        scripts: string[]
        persistent?: boolean
      }
      content_scripts?: {
        matches: string[]
        exclude_matches?: string[]
        include_globs?: string[]
        exclude_globs?: string[]
        css?: string[]
        js?: string[]
        all_frames?: boolean
        match_about_blank?: boolean
        run_at?: 'document_start' | 'document_end' | 'document_idle'
      }[]
      content_security_policy?: string
      developer?: {
        name?: string
        url?: string
      }
      icons?: {
        [imgSize: string]: string
      }
      incognito?: 'spanning' | 'split' | 'not_allowed'
      optional_permissions?: browser.permissions.Permission[]
      options_ui?: {
        page: string
        browser_style?: boolean
        chrome_style?: boolean
        open_in_tab?: boolean
      }
      permissions?: browser.permissions.Permission[]
      web_accessible_resources?: string[]

      // WebExtensionLangpackManifest
      languages: {
        [langCode: string]: {
          chrome_resources: {
            [resName: string]: string | { [urlName: string]: string }
          }
          version: string
        }
      }
      langpack_id?: string
      sources?: {
        [srcName: string]: {
          base_path: string
          paths?: string[]
        }
      }

      // Extracted from components
      browser_action?: {
        default_title?: string
        default_icon?: IconPath
        theme_icons?: {
          light: string
          dark: string
          size: number
        }[]
        default_popup?: string
        browser_style?: boolean
        default_area?: 'navbar' | 'menupanel' | 'tabstrip' | 'personaltoolbar'
      }
      commands?: {
        [keyName: string]: {
          suggested_key?: {
            default?: string
            mac?: string
            linux?: string
            windows?: string
            chromeos?: string
            android?: string
            ios?: string
          }
          description?: string
        }
      }
      default_locale?: browser.i18n.LanguageCode
      devtools_page?: string
      omnibox?: {
        keyword: string
      }
      page_action?: {
        default_title?: string
        default_icon?: IconPath
        default_popup?: string
        browser_style?: boolean
        show_matches?: string[]
        hide_matches?: string[]
      }
      sidebar_action?: {
        default_panel: string
        default_title?: string
        default_icon?: IconPath
        browser_style?: boolean
      }

      // Firefox specific
      applications?: {
        gecko?: FirefoxSpecificProperties
      }
      browser_specific_settings?: {
        gecko?: FirefoxSpecificProperties
      }
      experiment_apis?: any
      protocol_handlers?: {
        name: string
        protocol: string
        uriTemplate: string
      }

      // Opera specific
      minimum_opera_version?: string

      // Chrome specific
      action?: any
      automation?: any
      background_page?: any
      chrome_settings_overrides?: {
        homepage?: string
        search_provider?: {
          name: string
          search_url: string
          keyword?: string
          favicon_url?: string
          suggest_url?: string
          instant_url?: string
          is_default?: string
          image_url?: string
          search_url_post_params?: string
          instant_url_post_params?: string
          image_url_post_params?: string
          alternate_urls?: string[]
          prepopulated_id?: number
        }
      }
      chrome_ui_overrides?: {
        bookmarks_ui?: {
          remove_bookmark_shortcut?: true
          remove_button?: true
        }
      }
      chrome_url_overrides?: {
        newtab?: string
        bookmarks?: string
        history?: string
      }
      content_capabilities?: any
      converted_from_user_script?: any
      current_locale?: any
      declarative_net_request?: any
      event_rules?: any[]
      export?: {
        whitelist?: string[]
      }
      externally_connectable?: {
        ids?: string[]
        matches?: string[]
        accepts_tls_channel_id?: boolean
      }
      file_browser_handlers?: {
        id: string
        default_title: string
        file_filters: string[]
      }[]
      file_system_provider_capabilities?: {
        source: 'file' | 'device' | 'network'
        configurable?: boolean
        multiple_mounts?: boolean
        watchable?: boolean
      }
      import?: {
        id: string
        minimum_version?: string
      }[]
      input_components?: any
      key?: string
      minimum_chrome_version?: string
      nacl_modules?: {
        path: string
        mime_type: string
      }[]
      oauth2?: any
      offline_enabled?: boolean
      options_page?: string
      platforms?: any
      requirements?: any
      sandbox?: {
        pages: string[]
        content_security_policy?: string
      }[]
      signature?: any
      spellcheck?: any
      storage?: {
        managed_schema: string
      }
      system_indicator?: any
      tts_engine?: {
        voice: {
          voice_name: string
          lang?: string
          gender?: 'male' | 'female'
          event_types: (
            | 'start'
            | 'word'
            | 'sentence'
            | 'marker'
            | 'end'
            | 'error'
          )[]
        }[]
      }
      update_url?: string
      version_name?: string
    }

    function getBackgroundPage(): Promise<Window>
    function openOptionsPage(): Promise<void>
    function getManifest(): Manifest

    function getURL(path: string): string
    function setUninstallURL(url: string): Promise<void>
    function reload(): void
    // Will not exist: https://bugzilla.mozilla.org/show_bug.cgi?id=1314922
    // function RequestUpdateCheck(): Promise<RequestUpdateCheckStatus>;
    function connect(connectInfo?: {
      name?: string
      includeTlsChannelId?: boolean
    }): Port
    function connect(
      extensionId?: string,
      connectInfo?: { name?: string; includeTlsChannelId?: boolean }
    ): Port
    function connectNative(application: string): Port

    function sendMessage<T = any, U = any>(message: T): Promise<U>
    function sendMessage<T = any, U = any>(
      message: T,
      options: { includeTlsChannelId?: boolean; toProxyScript?: boolean }
    ): Promise<U>
    function sendMessage<T = any, U = any>(
      extensionId: string,
      message: T
    ): Promise<U>
    function sendMessage<T = any, U = any>(
      extensionId: string,
      message: T,
      options?: { includeTlsChannelId?: boolean; toProxyScript?: boolean }
    ): Promise<U>

    function sendNativeMessage(
      application: string,
      message: object
    ): Promise<object | void>
    function getPlatformInfo(): Promise<PlatformInfo>
    function getBrowserInfo(): Promise<{
      name: string
      vendor: string
      version: string
      buildID: string
    }>
    // Unsupported: https://bugzilla.mozilla.org/show_bug.cgi?id=1339407
    // function getPackageDirectoryEntry(): Promise<any>;

    const onStartup: Listener<void>
    const onInstalled: Listener<{
      reason: OnInstalledReason
      previousVersion?: string
      id?: string
    }>
    // Unsupported
    // const onSuspend: Listener<void>;
    // const onSuspendCanceled: Listener<void>;
    // const onBrowserUpdateAvailable: Listener<void>;
    // const onRestartRequired: Listener<OnRestartRequiredReason>;
    const onUpdateAvailable: Listener<{ version: string }>
    const onConnect: Listener<Port>

    const onConnectExternal: Listener<Port>

    type onMessagePromise = (
      message: object,
      sender: MessageSender,
      sendResponse: (response: object) => boolean
    ) => Promise<void>

    type onMessageBool = (
      message: object,
      sender: MessageSender,
      sendResponse: (response: object) => Promise<void>
    ) => boolean

    type onMessageVoid = (
      message: object,
      sender: MessageSender,
      sendResponse: (response: object) => Promise<void>
    ) => void

    type onMessageEvent = onMessagePromise | onMessageBool | onMessageVoid
    const onMessage: EvListener<onMessageEvent>

    const onMessageExternal: EvListener<onMessageEvent>
  }

  export namespace sessions {
    type Filter = { maxResults?: number }

    type Session = {
      lastModified: number
      tab: browser.tabs.Tab
      window: browser.windows.Window
    }

    const MAX_SESSION_RESULTS: number

    function getRecentlyClosed(filter?: Filter): Promise<Session[]>

    function restore(sessionId: string): Promise<Session>

    function setTabValue(
      tabId: number,
      key: string,
      value: string | object
    ): Promise<void>

    function getTabValue(
      tabId: number,
      key: string
    ): Promise<void | string | object>

    function removeTabValue(tabId: number, key: string): Promise<void>

    function setWindowValue(
      windowId: number,
      key: string,
      value: string | object
    ): Promise<void>

    function getWindowValue(
      windowId: number,
      key: string
    ): Promise<void | string | object>

    function removeWindowValue(windowId: number, key: string): Promise<void>

    const onChanged: EvListener<() => void>
  }

  export namespace sidebarAction {
    type ImageDataType = ImageData

    function setPanel(details: { panel: string; tabId?: number }): void

    function getPanel(details: { tabId?: number }): Promise<string>

    function setTitle(details: { title: string; tabId?: number }): void

    function getTitle(details: { tabId?: number }): Promise<string>

    type IconViaPath = {
      path: string | { [index: number]: string }
      tabId?: number
    }

    type IconViaImageData = {
      imageData: ImageDataType | { [index: number]: ImageDataType }
      tabId?: number
    }

    function setIcon(details: IconViaPath | IconViaImageData): Promise<void>

    function open(): Promise<void>

    function close(): Promise<void>
  }

  export namespace storage {
    // Non-firefox implementations don't accept all these types
    type StorageValue =
      | string
      | number
      | boolean
      | null
      | undefined
      | RegExp
      | ArrayBuffer
      | Uint8ClampedArray
      | Uint8Array
      | Uint16Array
      | Uint32Array
      | Int8Array
      | Int16Array
      | Int32Array
      | Float32Array
      | Float64Array
      | DataView
      | StorageArray
      | StorageMap
      | StorageSet
      | StorageObject

    // The Index signature makes casting to/from classes or interfaces a pain.
    // Custom types are OK.
    interface StorageObject {
      [key: string]: StorageValue
    }
    // These have to be interfaces rather than types to avoid a circular
    // definition of StorageValue
    interface StorageArray extends Array<StorageValue> {}
    interface StorageMap extends Map<StorageValue, StorageValue> {}
    interface StorageSet extends Set<StorageValue> {}

    interface Get {
      <T extends StorageObject>(keys?: string | string[] | null): Promise<T>
      /* <T extends StorageObject>(keys: T): Promise<{[K in keyof T]: T[K]}>; */
      <T extends StorageObject>(keys: T): Promise<T>
    }

    type StorageArea = {
      get: Get
      // unsupported: getBytesInUse: (keys: string|string[]|null) => Promise<number>,
      set: (keys: StorageObject) => Promise<void>
      remove: (keys: string | string[]) => Promise<void>
      clear: () => Promise<void>
    }

    type StorageChange = {
      oldValue?: any
      newValue?: any
    }

    const sync: StorageArea
    const local: StorageArea
    // unsupported: const managed: StorageArea;

    type ChangeDict = { [field: string]: StorageChange }
    type StorageName = 'sync' | 'local' /* |"managed" */

    const onChanged: EvListener<
      (changes: ChangeDict, areaName: StorageName) => void
    >
  }

  export namespace tabs {
    type MutedInfoReason = 'capture' | 'extension' | 'user'
    type MutedInfo = {
      muted: boolean
      extensionId?: string
      reason: MutedInfoReason
    }
    // TODO: Specify PageSettings properly.
    type PageSettings = object
    type Tab = {
      active: boolean
      audible?: boolean
      autoDiscardable?: boolean
      cookieStoreId?: string
      discarded?: boolean
      favIconUrl?: string
      height?: number
      hidden: boolean
      highlighted: boolean
      id?: number
      incognito: boolean
      index: number
      isArticle: boolean
      isInReaderMode: boolean
      lastAccessed: number
      mutedInfo?: MutedInfo
      openerTabId?: number
      pinned: boolean
      selected: boolean
      sessionId?: string
      status?: string
      title?: string
      url?: string
      width?: number
      windowId: number
    }

    type TabStatus = 'loading' | 'complete'
    type WindowType = 'normal' | 'popup' | 'panel' | 'devtools'
    type ZoomSettingsMode = 'automatic' | 'disabled' | 'manual'
    type ZoomSettingsScope = 'per-origin' | 'per-tab'
    type ZoomSettings = {
      defaultZoomFactor?: number
      mode?: ZoomSettingsMode
      scope?: ZoomSettingsScope
    }

    const TAB_ID_NONE: number

    function connect(
      tabId: number,
      connectInfo?: { name?: string; frameId?: number }
    ): browser.runtime.Port
    function create(createProperties: {
      active?: boolean
      cookieStoreId?: string
      index?: number
      openerTabId?: number
      pinned?: boolean
      // deprecated: selected: boolean,
      url?: string
      windowId?: number
    }): Promise<Tab>
    function captureTab(
      tabId?: number,
      options?: browser.extensionTypes.ImageDetails
    ): Promise<string>
    function captureVisibleTab(
      windowId?: number,
      options?: browser.extensionTypes.ImageDetails
    ): Promise<string>
    function detectLanguage(tabId?: number): Promise<string>
    function duplicate(tabId: number): Promise<Tab>
    function executeScript(
      tabId: number | undefined,
      details: browser.extensionTypes.InjectDetails
    ): Promise<object[]>
    function get(tabId: number): Promise<Tab>
    // deprecated: function getAllInWindow(): x;
    function getCurrent(): Promise<Tab>
    // deprecated: function getSelected(windowId?: number): Promise<browser.tabs.Tab>;
    function getZoom(tabId?: number): Promise<number>
    function getZoomSettings(tabId?: number): Promise<ZoomSettings>
    function hide(tabIds: number | number[]): Promise<number[]>
    // unsupported: function highlight(highlightInfo: {
    //     windowId?: number,
    //     tabs: number[]|number,
    // }): Promise<browser.windows.Window>;
    function insertCSS(
      tabId: number | undefined,
      details: browser.extensionTypes.InjectDetailsCSS
    ): Promise<void>
    function removeCSS(
      tabId: number | undefined,
      details: browser.extensionTypes.InjectDetails
    ): Promise<void>
    function move(
      tabIds: number | number[],
      moveProperties: {
        windowId?: number
        index: number
      }
    ): Promise<Tab | Tab[]>
    function print(): Promise<void>
    function printPreview(): Promise<void>
    function query(queryInfo: {
      active?: boolean
      audible?: boolean
      // unsupported: autoDiscardable?: boolean,
      cookieStoreId?: string
      currentWindow?: boolean
      discarded?: boolean
      hidden?: boolean
      highlighted?: boolean
      index?: number
      muted?: boolean
      lastFocusedWindow?: boolean
      pinned?: boolean
      status?: TabStatus
      title?: string
      url?: string | string[]
      windowId?: number
      windowType?: WindowType
    }): Promise<Tab[]>
    function reload(
      tabId?: number,
      reloadProperties?: { bypassCache?: boolean }
    ): Promise<void>
    function remove(tabIds: number | number[]): Promise<void>
    function saveAsPDF(
      pageSettings: PageSettings
    ): Promise<'saved' | 'replaced' | 'canceled' | 'not_saved' | 'not_replaced'>
    function sendMessage<T = any, U = object>(
      tabId: number,
      message: T,
      options?: { frameId?: number }
    ): Promise<U | void>
    // deprecated: function sendRequest(): x;
    function setZoom(
      tabId: number | undefined,
      zoomFactor: number
    ): Promise<void>
    function setZoomSettings(
      tabId: number | undefined,
      zoomSettings: ZoomSettings
    ): Promise<void>
    function show(tabIds: number | number[]): Promise<void>
    function toggleReaderMode(tabId?: number): Promise<void>
    function update(
      tabId: number | undefined,
      updateProperties: {
        active?: boolean
        // unsupported: autoDiscardable?: boolean,
        // unsupported: highlighted?: boolean,
        // unsupported: hidden?: boolean;
        loadReplace?: boolean
        muted?: boolean
        openerTabId?: number
        pinned?: boolean
        // deprecated: selected?: boolean,
        url?: string
      }
    ): Promise<Tab>

    const onActivated: Listener<{ tabId: number; windowId: number }>
    const onAttached: EvListener<
      (
        tabId: number,
        attachInfo: {
          newWindowId: number
          newPosition: number
        }
      ) => void
    >
    const onCreated: Listener<Tab>
    const onDetached: EvListener<
      (
        tabId: number,
        detachInfo: {
          oldWindowId: number
          oldPosition: number
        }
      ) => void
    >
    const onHighlighted: Listener<{ windowId: number; tabIds: number[] }>
    const onMoved: EvListener<
      (
        tabId: number,
        moveInfo: {
          windowId: number
          fromIndex: number
          toIndex: number
        }
      ) => void
    >
    const onRemoved: EvListener<
      (
        tabId: number,
        removeInfo: {
          windowId: number
          isWindowClosing: boolean
        }
      ) => void
    >
    const onReplaced: EvListener<
      (addedTabId: number, removedTabId: number) => void
    >
    const onUpdated: EvListener<
      (
        tabId: number,
        changeInfo: {
          audible?: boolean
          discarded?: boolean
          favIconUrl?: string
          mutedInfo?: MutedInfo
          pinned?: boolean
          status?: string
          title?: string
          url?: string
        },
        tab: Tab
      ) => void
    >
    const onZoomChanged: Listener<{
      tabId: number
      oldZoomFactor: number
      newZoomFactor: number
      zoomSettings: ZoomSettings
    }>
  }

  export namespace topSites {
    type MostVisitedURL = {
      title: string
      url: string
    }
    function get(): Promise<MostVisitedURL[]>
  }

  export namespace webNavigation {
    type TransitionType = 'link' | 'auto_subframe' | 'form_submit' | 'reload'
    // unsupported: | "typed" | "auto_bookmark" | "manual_subframe"
    //              | "generated" | "start_page" | "keyword"
    //              | "keyword_generated";

    type TransitionQualifier =
      | 'client_redirect'
      | 'server_redirect'
      | 'forward_back'
    // unsupported: "from_address_bar";

    function getFrame(details: {
      tabId: number
      processId: number
      frameId: number
    }): Promise<{ errorOccured: boolean; url: string; parentFrameId: number }>

    function getAllFrames(details: { tabId: number }): Promise<
      {
        errorOccured: boolean
        processId: number
        frameId: number
        parentFrameId: number
        url: string
      }[]
    >

    interface NavListener<T> {
      addListener: (
        callback: (arg: T) => void,
        filter?: {
          url: browser.events.UrlFilter[]
        }
      ) => void
      removeListener: (callback: (arg: T) => void) => void
      hasListener: (callback: (arg: T) => void) => boolean
    }

    type DefaultNavListener = NavListener<{
      tabId: number
      url: string
      processId: number
      frameId: number
      timeStamp: number
    }>

    type TransitionNavListener = NavListener<{
      tabId: number
      url: string
      processId: number
      frameId: number
      timeStamp: number
      transitionType: TransitionType
      transitionQualifiers: TransitionQualifier[]
    }>

    const onBeforeNavigate: NavListener<{
      tabId: number
      url: string
      processId: number
      frameId: number
      parentFrameId: number
      timeStamp: number
    }>

    const onCommitted: TransitionNavListener

    const onCreatedNavigationTarget: NavListener<{
      sourceFrameId: number
      // Unsupported: sourceProcessId: number,
      sourceTabId: number
      tabId: number
      timeStamp: number
      url: string
      windowId: number
    }>

    const onDOMContentLoaded: DefaultNavListener

    const onCompleted: DefaultNavListener

    const onErrorOccurred: DefaultNavListener // error field unsupported

    const onReferenceFragmentUpdated: TransitionNavListener

    const onHistoryStateUpdated: TransitionNavListener
  }

  export namespace webRequest {
    type ResourceType =
      | 'main_frame'
      | 'sub_frame'
      | 'stylesheet'
      | 'script'
      | 'image'
      | 'object'
      | 'xmlhttprequest'
      | 'xbl'
      | 'xslt'
      | 'ping'
      | 'beacon'
      | 'xml_dtd'
      | 'font'
      | 'media'
      | 'websocket'
      | 'csp_report'
      | 'imageset'
      | 'web_manifest'
      | 'other'

    type RequestFilter = {
      urls: string[]
      types?: ResourceType[]
      tabId?: number
      windowId?: number
    }

    type StreamFilter = {
      onstart: (event: any) => void
      ondata: (event: { data: ArrayBuffer }) => void
      onstop: (event: any) => void
      onerror: (event: any) => void

      close(): void
      disconnect(): void
      resume(): void
      suspend(): void
      write(data: Uint8Array | ArrayBuffer): void

      error: string
      status:
        | 'uninitialized'
        | 'transferringdata'
        | 'finishedtransferringdata'
        | 'suspended'
        | 'closed'
        | 'disconnected'
        | 'failed'
    }

    type HttpHeaders = (
      | { name: string; binaryValue: number[]; value?: string }
      | { name: string; value: string; binaryValue?: number[] }
    )[]

    type BlockingResponse = {
      cancel?: boolean
      redirectUrl?: string
      requestHeaders?: HttpHeaders
      responseHeaders?: HttpHeaders
      authCredentials?: { username: string; password: string }
    }

    type UploadData = {
      bytes?: ArrayBuffer
      file?: string
    }

    const MAX_HANDLER_BEHAVIOR_CHANGED_CALLS_PER_10_MINUTES: number

    function handlerBehaviorChanged(): Promise<void>

    // TODO: Enforce the return result of the addListener call in the contract
    //       Use an intersection type for all the default properties
    interface ReqListener<T, U> {
      addListener: (
        callback: (arg: T) => void,
        filter: RequestFilter,
        extraInfoSpec?: Array<U>
      ) => BlockingResponse | Promise<BlockingResponse>
      removeListener: (callback: (arg: T) => void) => void
      hasListener: (callback: (arg: T) => void) => boolean
    }

    const onBeforeRequest: ReqListener<
      {
        requestId: string
        url: string
        method: string
        frameId: number
        parentFrameId: number
        requestBody?: {
          error?: string
          formData?: { [key: string]: string[] }
          raw?: UploadData[]
        }
        tabId: number
        type: ResourceType
        timeStamp: number
        originUrl: string
      },
      'blocking' | 'requestBody'
    >

    const onBeforeSendHeaders: ReqListener<
      {
        requestId: string
        url: string
        method: string
        frameId: number
        parentFrameId: number
        tabId: number
        type: ResourceType
        timeStamp: number
        originUrl: string
        requestHeaders?: HttpHeaders
      },
      'blocking' | 'requestHeaders'
    >

    const onSendHeaders: ReqListener<
      {
        requestId: string
        url: string
        method: string
        frameId: number
        parentFrameId: number
        tabId: number
        type: ResourceType
        timeStamp: number
        originUrl: string
        requestHeaders?: HttpHeaders
      },
      'requestHeaders'
    >

    const onHeadersReceived: ReqListener<
      {
        requestId: string
        url: string
        method: string
        frameId: number
        parentFrameId: number
        tabId: number
        type: ResourceType
        timeStamp: number
        originUrl: string
        statusLine: string
        responseHeaders?: HttpHeaders
        statusCode: number
      },
      'blocking' | 'responseHeaders'
    >

    const onAuthRequired: ReqListener<
      {
        requestId: string
        url: string
        method: string
        frameId: number
        parentFrameId: number
        tabId: number
        type: ResourceType
        timeStamp: number
        scheme: string
        realm?: string
        challenger: { host: string; port: number }
        isProxy: boolean
        responseHeaders?: HttpHeaders
        statusLine: string
        statusCode: number
      },
      'blocking' | 'responseHeaders'
    >

    const onResponseStarted: ReqListener<
      {
        requestId: string
        url: string
        method: string
        frameId: number
        parentFrameId: number
        tabId: number
        type: ResourceType
        timeStamp: number
        originUrl: string
        ip?: string
        fromCache: boolean
        statusLine: string
        responseHeaders?: HttpHeaders
        statusCode: number
      },
      'responseHeaders'
    >

    const onBeforeRedirect: ReqListener<
      {
        requestId: string
        url: string
        method: string
        frameId: number
        parentFrameId: number
        tabId: number
        type: ResourceType
        timeStamp: number
        originUrl: string
        ip?: string
        fromCache: boolean
        statusCode: number
        redirectUrl: string
        statusLine: string
        responseHeaders?: HttpHeaders
      },
      'responseHeaders'
    >

    const onCompleted: ReqListener<
      {
        requestId: string
        url: string
        method: string
        frameId: number
        parentFrameId: number
        tabId: number
        type: ResourceType
        timeStamp: number
        originUrl: string
        ip?: string
        fromCache: boolean
        statusCode: number
        statusLine: string
        responseHeaders?: HttpHeaders
      },
      'responseHeaders'
    >

    const onErrorOccurred: ReqListener<
      {
        requestId: string
        url: string
        method: string
        frameId: number
        parentFrameId: number
        tabId: number
        type: ResourceType
        timeStamp: number
        originUrl: string
        ip?: string
        fromCache: boolean
        error: string
      },
      void
    >

    function filterResponseData(requestId: string): StreamFilter
  }

  export namespace windows {
    type WindowType = 'normal' | 'popup' | 'panel' | 'devtools'

    type WindowState =
      | 'normal'
      | 'minimized'
      | 'maximized'
      | 'fullscreen'
      | 'docked'

    type Window = {
      id?: number
      focused: boolean
      top?: number
      left?: number
      width?: number
      height?: number
      tabs?: browser.tabs.Tab[]
      incognito: boolean
      type?: WindowType
      state?: WindowState
      alwaysOnTop: boolean
      sessionId?: string
    }

    type CreateType = 'normal' | 'popup' | 'panel' | 'detached_panel'

    const WINDOW_ID_NONE: number

    const WINDOW_ID_CURRENT: number

    function get(
      windowId: number,
      getInfo?: {
        populate?: boolean
        windowTypes?: WindowType[]
      }
    ): Promise<browser.windows.Window>

    function getCurrent(getInfo?: {
      populate?: boolean
      windowTypes?: WindowType[]
    }): Promise<browser.windows.Window>

    function getLastFocused(getInfo?: {
      populate?: boolean
      windowTypes?: WindowType[]
    }): Promise<browser.windows.Window>

    function getAll(getInfo?: {
      populate?: boolean
      windowTypes?: WindowType[]
    }): Promise<browser.windows.Window[]>

    // TODO: url and tabId should be exclusive
    function create(createData?: {
      allowScriptsToClose?: boolean
      url?: string | string[]
      tabId?: number
      left?: number
      top?: number
      width?: number
      height?: number
      // unsupported: focused?: boolean,
      incognito?: boolean
      titlePreface?: string
      type?: CreateType
      state?: WindowState
    }): Promise<browser.windows.Window>

    function update(
      windowId: number,
      updateInfo: {
        left?: number
        top?: number
        width?: number
        height?: number
        focused?: boolean
        drawAttention?: boolean
        state?: WindowState
      }
    ): Promise<browser.windows.Window>

    function remove(windowId: number): Promise<void>

    const onCreated: Listener<browser.windows.Window>

    const onRemoved: Listener<number>

    const onFocusChanged: Listener<number>
  }

  export namespace theme {
    type Theme = {
      images: ThemeImages
      colors: ThemeColors
      properties?: ThemeProperties
    }

    type ThemeImages = {
      headerURL: string
      theme_frame?: string
      additional_backgrounds?: string[]
    }

    type ThemeColors = {
      accentcolor: string
      textcolor: string
      frame?: [number, number, number]
      tab_text?: [number, number, number]
      toolbar?: string
      toolbar_text?: string
      toolbar_field?: string
      toolbar_field_text?: string
    }

    type ThemeProperties = {
      additional_backgrounds_alignment: Alignment[]
      additional_backgrounds_tiling: Tiling[]
    }

    type Alignment =
      | 'bottom'
      | 'center'
      | 'left'
      | 'right'
      | 'top'
      | 'center bottom'
      | 'center center'
      | 'center top'
      | 'left bottom'
      | 'left center'
      | 'left top'
      | 'right bottom'
      | 'right center'
      | 'right top'

    type Tiling = 'no-repeat' | 'repeat' | 'repeat-x' | 'repeat-y'

    function getCurrent(): Promise<Theme>
    function getCurrent(windowId: number): Promise<Theme>
    function update(theme: Theme): Promise<void>
    function update(windowId: number, theme: Theme): Promise<void>
    function reset(): Promise<void>
    function reset(windowId: number): Promise<void>
  }
}
