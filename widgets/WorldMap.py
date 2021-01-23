import sqlite3

from core.webui.model.Widget import Widget
from core.webui.model.WidgetSizes import WidgetSizes


class WorldMap(Widget):

	DEFAULT_SIZE = WidgetSizes.w_extralarge_wide
	DEFAULT_OPTIONS: dict = dict()

	def __init__(self, data: sqlite3.Row):
		super().__init__(data)
