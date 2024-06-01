#!@PYTHON@

import sys
from gi.repository import Gio, GLib

DBUS_NAME = "com.jeffser.Alpaca.SearchProvider"
DBUS_OBJECT_PATH = "/com/jeffser/Alpaca/SearchProvider"
DBUS_INTERFACE = "org.gnome.Shell.SearchProvider2"

class SearchProvider:
	def __init__(self):
		print("ALPACA __init__")
		self.connection = Gio.bus_get_sync(Gio.BusType.SESSION, None)
		self.connection.register_object(DBUS_OBJECT_PATH, self.get_interface_info(), None, self.handle_method_call, None)

	def get_interface_info(self):
		xml = """
		<node>
			<interface name='org.gnome.Shell.SearchProvider2'>
				<method name='GetInitialResultSet'>
					<arg type='as' name='terms' direction='in'/>
					<arg type='as' name='results' direction='out'/>
				</method>
				<method name='GetSubsearchResultSet'>
					<arg type='as' name='previous_results' direction='in'/>
					<arg type='as' name='terms' direction='in'/>
					<arg type='as' name='results' direction='out'/>
				</method>
				<method name='GetResultMetas'>
					<arg type='as' name='identifiers' direction='in'/>
					<arg type='a{sv}' name='metas' direction='out'/>
				</method>
				<method name='ActivateResult'>
					<arg type='s' name='identifier' direction='in'/>
					<arg type='as' name='terms' direction='in'/>
					<arg type='i' name='timestamp' direction='in'/>
				</method>
			</interface>
		</node>
		"""
		return Gio.DBusNodeInfo.new_for_xml(xml).interfaces[0]

	def handle_method_call(self, connection, sender, object_path, interface_name, method_name, parameters, invocation):
		if method_name == "GetInitialResultSet":
			self.handle_get_initial_result_set(invocation, parameters)
		elif method_name == "GetSubsearchResultSet":
			self.handle_get_subsearch_result_set(invocation, parameters)
		elif method_name == "GetResultMetas":
			self.handle_get_result_metas(invocation, parameters)
		elif method_name == "ActivateResult":
			self.handle_activate_result(invocation, parameters)

	def handle_get_initial_result_set(self, invocation, parameters):
		terms = parameters.unpack()[0]
		print(f"Initial search terms: {terms}")
		results = ["result1", "result2"]
		invocation.return_value(GLib.Variant("(as)", [results]))

	def handle_get_subsearch_result_set(self, invocation, parameters):
		previous_results, terms = parameters.unpack()
		print(f"Subsearch terms: {terms}, previous results: {previous_results}")
		results = ["result3", "result4"]
		invocation.return_value(GLib.Variant("(as)", [results]))

	def handle_get_result_metas(self, invocation, parameters):
		identifiers = parameters.unpack()[0]
		print(f"Result metas for identifiers: {identifiers}")
		metas = []
		for identifier in identifiers:
			meta = {"name": GLib.Variant("s", identifier)}
			metas.append(GLib.Variant("a{sv}", meta))
		invocation.return_value(GLib.Variant("(a{sv})", [metas]))


	def handle_activate_result(self, invocation, parameters):
		identifier, terms, timestamp = parameters.unpack()
		print(f"Activated result: {identifier}, terms: {terms}, timestamp: {timestamp}")
		invocation.return_value(None)

if __name__ == "__main__":
	provider = SearchProvider()
	loop = GLib.MainLoop()
	loop.run()

